import CryptoJS from 'crypto-js';

/**
 * Generates an MD5 Hash (Legacy/Insecure - Educational use only)
 */
export const hashMD5 = (text: string): string => {
  return CryptoJS.MD5(text).toString();
};

/**
 * Generates a SHA-256 Hash (Secure, standard)
 */
export const hashSHA256 = (text: string): string => {
  return CryptoJS.SHA256(text).toString();
};

/**
 * Generates a SHA-512 Hash (High security)
 */
export const hashSHA512 = (text: string): string => {
  return CryptoJS.SHA512(text).toString();
};

/**
 * Simulated Slow Hash (Educational Replacement for Argon2)
 * Since true Argon2 WASM breaks modern NextJS bundlers without complex Server Component overrides,
 * we use a massive loop of SHA-512 to intentionally lock the thread/simulate the 
 * "Key Stretching" defense mechanic of KDFs like Argon2/Bcrypt for the UI demonstration.
 */
export const hashSimulatedSlow = async (password: string, iterations: number = 3000): Promise<string> => {
    return new Promise((resolve) => {
        // We use setTimeout to avoid completely freezing the browser UI thread
        // while still taking noticeable computational time.
        setTimeout(() => {
            let currentHash = CryptoJS.SHA512(password + "salt").toString();
            for (let i = 0; i < iterations; i++) {
                currentHash = CryptoJS.SHA512(currentHash).toString();
            }
            resolve(currentHash.substring(0, 32)); // Truncate to look like a standard hash output length
        }, 50);
    });
};
