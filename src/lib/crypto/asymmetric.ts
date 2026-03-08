/**
 * Handles Asymmetric Encryption (RSA) using the native Web Crypto API
 * We use RSA-OAEP for encryption as it is the standard for secure data exchange.
 */

export interface KeyPair {
    publicKey: CryptoKey | null;
    privateKey: CryptoKey | null;
}

/**
 * Generates an RSA-OAEP key pair (Public/Private)
 */
export const generateRSAKeyPair = async (): Promise<KeyPair> => {
    try {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048, // 4096 is more secure, but 2048 is faster for browser demo
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true, // extractable (so we can show it to the user)
            ["encrypt", "decrypt"]
        );
        return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
    } catch (e) {
        console.error("RSA Key Gen Error", e);
        return { publicKey: null, privateKey: null };
    }
}

/**
 * Encrypts a string using an RSA Public Key
 */
export const encryptRSA = async (plaintext: string, publicKey: CryptoKey): Promise<string> => {
    try {
        const enc = new TextEncoder();
        const encodedText = enc.encode(plaintext);

        const encryptedData = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            encodedText
        );

        // Convert ArrayBuffer to Base64 for display
        const buffer = new Uint8Array(encryptedData);
        let binary = '';
        for (let i = 0; i < buffer.byteLength; i++) {
            binary += String.fromCharCode(buffer[i]);
        }
        return btoa(binary);

    } catch (e) {
        console.error("RSA Encrypt Error", e);
        return "Encryption Failed (Key Invalid or Data too large)";
    }
}

/**
 * Decrypts a Base64 string using an RSA Private Key
 */
export const decryptRSA = async (cipherBase64: string, privateKey: CryptoKey): Promise<string> => {
    try {
        // Convert Base64 back to ArrayBuffer
        const binary = atob(cipherBase64);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            buffer[i] = binary.charCodeAt(i);
        }

        const decryptedData = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            buffer.buffer
        );

        const dec = new TextDecoder();
        return dec.decode(decryptedData);

    } catch (e) {
        console.error("RSA Decrypt Error", e);
        return "Decryption Failed (Wrong Private Key)";
    }
}

/**
 * Generates an RSA-PSS key pair for Digital Signatures
 */
export const generateSignatureKeyPair = async (): Promise<KeyPair> => {
    try {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-PSS",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["sign", "verify"]
        );
        return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
    } catch (e) {
        console.error("Signature Key Gen Error", e);
        return { publicKey: null, privateKey: null };
    }
}

/**
 * Signs a message using an RSA Private Key (PSS)
 */
export const signMessage = async (message: string, privateKey: CryptoKey): Promise<string> => {
    try {
        const enc = new TextEncoder();
        const encodedMessage = enc.encode(message);

        const signature = await window.crypto.subtle.sign(
            {
                name: "RSA-PSS",
                saltLength: 32,
            },
            privateKey,
            encodedMessage
        );

        const buffer = new Uint8Array(signature);
        let binary = '';
        for (let i = 0; i < buffer.byteLength; i++) {
            binary += String.fromCharCode(buffer[i]);
        }
        return btoa(binary);
    } catch (e) {
        console.error("Signing Error", e);
        return "Signing Failed";
    }
}

/**
 * Verifies a signature using an RSA Public Key (PSS)
 */
export const verifySignature = async (message: string, signatureBase64: string, publicKey: CryptoKey): Promise<boolean> => {
    try {
        const enc = new TextEncoder();
        const encodedMessage = enc.encode(message);

        const binary = atob(signatureBase64);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            buffer[i] = binary.charCodeAt(i);
        }

        const isValid = await window.crypto.subtle.verify(
            {
                name: "RSA-PSS",
                saltLength: 32,
            },
            publicKey,
            buffer.buffer,
            encodedMessage
        );

        return isValid;
    } catch (e) {
        console.error("Verification Error", e);
        return false;
    }
}
