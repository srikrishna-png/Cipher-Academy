/**
 * Image Steganography Utility (LSB - Least Significant Bit)
 * Supports both Text and Binary Files with a metadata header.
 */

interface StegoMetadata {
    type: 'text' | 'file';
    filename?: string;
    mimeType?: string;
    size: number;
}

const HEADER_MARKER = "STEGO_V1:";

/**
 * Converts a Uint8Array to a binary string of bits
 */
const bytesToBits = (bytes: Uint8Array): string => {
    let bits = '';
    for (let i = 0; i < bytes.length; i++) {
        bits += bytes[i].toString(2).padStart(8, '0');
    }
    return bits;
}

/**
 * Converts a string of bits back to a Uint8Array
 */
const bitsToBytes = (bits: string): Uint8Array => {
    const bytes = new Uint8Array(Math.floor(bits.length / 8));
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(bits.slice(i * 8, (i + 8)), 2);
    }
    return bytes;
}

/**
 * Hides binary data inside the image data of a Canvas
 */
export const encodeStego = (imageData: ImageData, payload: Uint8Array, metadata: StegoMetadata): ImageData => {
    // 1. Create the header: MARKER + JSON_METADATA_LENGTH(4 bytes) + JSON_METADATA + NULL_TERMINATOR
    const metaString = JSON.stringify(metadata);
    const headerEncoder = new TextEncoder();
    const markerBytes = headerEncoder.encode(HEADER_MARKER);
    const metaBytes = headerEncoder.encode(metaString);

    // Total header = [Marker] [MetaLength(uint32)] [MetaData] [0(null)]
    const totalSize = markerBytes.length + 4 + metaBytes.length + 1 + payload.length;
    const data = imageData.data;

    if (totalSize * 8 > data.length / 4 * 3) { // Using R, G, B channels (3 bits per pixel)
        throw new Error(`Payload too large. Needed ${Math.ceil(totalSize * 8)} bits, but image only has ${Math.floor(data.length / 4 * 3)} bits available.`);
    }

    // Combine everything into one big buffer
    const combined = new Uint8Array(totalSize);
    let offset = 0;

    combined.set(markerBytes, offset);
    offset += markerBytes.length;

    // Store metadata length as 4 bytes
    const view = new DataView(combined.buffer);
    view.setUint32(offset, metaBytes.length);
    offset += 4;

    combined.set(metaBytes, offset);
    offset += metaBytes.length;

    combined[offset] = 0; // Null terminator for headers
    offset += 1;

    combined.set(payload, offset);

    // 2. Encode into bits
    const bits = bytesToBits(combined);

    // 3. Apply LSB across R, G, B channels
    let bitIndex = 0;
    for (let i = 0; i < data.length && bitIndex < bits.length; i++) {
        if (i % 4 === 3) continue; // Skip Alpha channel

        data[i] = (data[i] & 254) | parseInt(bits[bitIndex], 10);
        bitIndex++;
    }

    return imageData;
}

/**
 * Extracts hidden data from Canvas image data
 */
export const decodeStego = (imageData: ImageData): { payload: Uint8Array; metadata: StegoMetadata } | null => {
    const data = imageData.data;
    const bufferSize = Math.floor((data.length / 4) * 3 / 8);
    const extractedBytes = new Uint8Array(bufferSize);

    let bitString = '';
    let byteIndex = 0;

    // 1. Extract all possible bits from R, G, B channels
    for (let i = 0; i < data.length && byteIndex < bufferSize; i++) {
        if (i % 4 === 3) continue; // Skip Alpha

        bitString += (data[i] & 1).toString();

        if (bitString.length === 8) {
            extractedBytes[byteIndex] = parseInt(bitString, 2);
            byteIndex++;
            bitString = '';
        }
    }

    // 2. Check for marker
    const decoder = new TextDecoder();
    const marker = decoder.decode(extractedBytes.slice(0, HEADER_MARKER.length));

    if (marker !== HEADER_MARKER) return null;

    let offset = HEADER_MARKER.length;

    // 3. Read metadata length
    const view = new DataView(extractedBytes.buffer);
    const metaLength = view.getUint32(offset);
    offset += 4;

    // 4. Read metadata
    const metaBytes = extractedBytes.slice(offset, offset + metaLength);
    const metaString = decoder.decode(metaBytes);
    const metadata = JSON.parse(metaString) as StegoMetadata;
    offset += metaLength + 1; // +1 for null terminator

    // 5. Read payload
    const payload = extractedBytes.slice(offset, offset + metadata.size);

    return { payload, metadata };
}
