/**
 * JWT Utility Library using Web Crypto API
 * Implements HS256 (HMAC with SHA-256) signing and verification.
 */

// Helper to convert string to Base64Url
const toBase64Url = (str: string): string => {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

// Helper to convert ArrayBuffer to Base64Url
const bufferToBase64Url = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return toBase64Url(binary);
};

// Helper to decode Base64Url
const fromBase64Url = (str: string): string => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
};

/**
 * Signs a payload with a secret using HS256
 */
export const signJWT = async (payload: any, secret: string, header: any = { alg: "HS256", typ: "JWT" }): Promise<string> => {
    if (!secret) throw new Error("Secret key must not be empty");

    try {
        const enc = new TextEncoder();
        const headerStr = toBase64Url(JSON.stringify(header));
        const payloadStr = toBase64Url(typeof payload === 'string' ? payload : JSON.stringify(payload));
        const dataToSign = `${headerStr}.${payloadStr}`;

        const key = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const signature = await window.crypto.subtle.sign(
            "HMAC",
            key,
            enc.encode(dataToSign)
        );

        const signatureStr = bufferToBase64Url(signature);
        return `${dataToSign}.${signatureStr}`;
    } catch (e) {
        console.error("JWT Sign Error", e);
        throw e;
    }
};

/**
 * Decodes a JWT without verification
 */
export const decodeJWT = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error("Invalid JWT format");

        const header = JSON.parse(fromBase64Url(parts[0]));
        let payload;
        try {
            payload = JSON.parse(fromBase64Url(parts[1]));
        } catch {
            payload = fromBase64Url(parts[1]); // Fallback for plain text payloads
        }
        const signature = parts[2];

        return { header, payload, signature };
    } catch (e) {
        console.error("JWT Decode Error", e);
        return null;
    }
};

/**
 * Verifies a JWT signature using a secret
 */
export const verifyJWT = async (token: string, secret: string): Promise<boolean> => {
    if (!secret) return false;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const dataToVerify = `${parts[0]}.${parts[1]}`;
        const signature = parts[2];

        const enc = new TextEncoder();
        const key = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
        );

        // Convert signature back to buffer
        const sigBinary = fromBase64Url(signature);
        const sigBuffer = new Uint8Array(sigBinary.length);
        for (let i = 0; i < sigBinary.length; i++) {
            sigBuffer[i] = sigBinary.charCodeAt(i);
        }

        const isValid = await window.crypto.subtle.verify(
            "HMAC",
            key,
            sigBuffer.buffer,
            enc.encode(dataToVerify)
        );

        return isValid;
    } catch (e) {
        console.error("JWT Verify Error", e);
        return false;
    }
};
