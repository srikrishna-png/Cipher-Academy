import JSZip from "jszip";

/**
 * Creates a Zip file from an array of File objects.
 */
export async function createZip(files: File[]): Promise<Blob> {
    const zip = new JSZip();

    for (const file of files) {
        // Add each file to the zip. 
        // We use arrayBuffer to handle binary data correctly.
        const content = await file.arrayBuffer();
        zip.file(file.name, content, { binary: true });
    }

    return await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });
}

/**
 * Extracts files from a Zip file.
 */
export async function extractZip(zipFile: File): Promise<{ name: string; blob: Blob }[]> {
    const zip = new JSZip();
    const content = await zipFile.arrayBuffer();
    const loadedZip = await zip.loadAsync(content);

    const extractedFiles: { name: string; blob: Blob }[] = [];

    // Iterate over each file in the zip
    const promises: Promise<void>[] = [];

    loadedZip.forEach((relativePath, file) => {
        if (!file.dir) {
            const promise = file.async("blob").then((blob) => {
                extractedFiles.push({ name: relativePath, blob });
            });
            promises.push(promise);
        }
    });

    await Promise.all(promises);
    return extractedFiles;
}
