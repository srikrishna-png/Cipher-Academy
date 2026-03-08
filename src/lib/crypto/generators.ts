/**
 * Cryptographically Secure Password/Key Generator
 */
export const generateSecurePassword = (
  length: number = 16,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  } = { uppercase: true, lowercase: true, numbers: true, symbols: true }
): string => {
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
  };

  let validChars = "";
  if (options.uppercase) validChars += charSets.uppercase;
  if (options.lowercase) validChars += charSets.lowercase;
  if (options.numbers) validChars += charSets.numbers;
  if (options.symbols) validChars += charSets.symbols;

  if (validChars.length === 0) return ""; // Fallback

  const randomValues = new Uint32Array(length);
  // Using the native, cryptographically secure Web Crypto API
  window.crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    // Modulo bias is slight here but acceptable for client-side tool
    result += validChars[randomValues[i] % validChars.length];
  }

  return result;
};
