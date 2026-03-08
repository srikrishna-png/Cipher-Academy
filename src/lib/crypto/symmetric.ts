import CryptoJS from 'crypto-js';

// --- AES (Advanced Encryption Standard) ---

export const encryptAES = (plaintext: string, secretKey: string): string => {
  try {
    if (!plaintext || !secretKey) return "";
    return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  } catch (e) {
    return "Encryption Error";
  }
};

export const decryptAES = (ciphertext: string, secretKey: string): string => {
  try {
    if (!ciphertext || !secretKey) return "";
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption Failed (Wrong Key or Corrupted Data)";
  } catch (e) {
    return "Decryption Error";
  }
};

// --- DES (Data Encryption Standard - Educational/Legacy) ---

export const encryptDES = (plaintext: string, secretKey: string): string => {
  try {
    if (!plaintext || !secretKey) return "";
    return CryptoJS.DES.encrypt(plaintext, secretKey).toString();
  } catch (e) {
    return "Encryption Error";
  }
};

export const decryptDES = (ciphertext: string, secretKey: string): string => {
  try {
    if (!ciphertext || !secretKey) return "";
    const bytes = CryptoJS.DES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption Failed (Wrong Key or Corrupted Data)";
  } catch (e) {
    return "Decryption Error";
  }
};
// --- TripleDES (3DES) ---

export const encrypt3DES = (plaintext: string, secretKey: string): string => {
  try {
    if (!plaintext || !secretKey) return "";
    return CryptoJS.TripleDES.encrypt(plaintext, secretKey).toString();
  } catch (e) {
    return "Encryption Error";
  }
};

export const decrypt3DES = (ciphertext: string, secretKey: string): string => {
  try {
    if (!ciphertext || !secretKey) return "";
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption Failed (Wrong Key or Corrupted Data)";
  } catch (e) {
    return "Decryption Error";
  }
};

// --- RC4 (Educational/Legacy) ---

export const encryptRC4 = (plaintext: string, secretKey: string): string => {
  try {
    if (!plaintext || !secretKey) return "";
    return CryptoJS.RC4.encrypt(plaintext, secretKey).toString();
  } catch (e) {
    return "Encryption Error";
  }
};

export const decryptRC4 = (ciphertext: string, secretKey: string): string => {
  try {
    if (!ciphertext || !secretKey) return "";
    const bytes = CryptoJS.RC4.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption Failed (Wrong Key or Corrupted Data)";
  } catch (e) {
    return "Decryption Error";
  }
};

// --- Rabbit ---

export const encryptRabbit = (plaintext: string, secretKey: string): string => {
  try {
    if (!plaintext || !secretKey) return "";
    return CryptoJS.Rabbit.encrypt(plaintext, secretKey).toString();
  } catch (e) {
    return "Encryption Error";
  }
};

export const decryptRabbit = (ciphertext: string, secretKey: string): string => {
  try {
    if (!ciphertext || !secretKey) return "";
    const bytes = CryptoJS.Rabbit.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Decryption Failed (Wrong Key or Corrupted Data)";
  } catch (e) {
    return "Decryption Error";
  }
};
