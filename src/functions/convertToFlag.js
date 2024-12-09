/**
 * Converts a given ISO 3166-1 alpha-2 country code to its corresponding
 * regional indicator symbol.
 *
 * @param {string} countryCode - the ISO 3166-1 alpha-2 country code
 * @returns {string} the regional indicator symbol
 * @throws {Error} if the country code is not a non-empty string, or does not
 *   consist of exactly two uppercase letters
 */
export function convertToFlag(countryCode) {
  if (!countryCode || typeof countryCode !== "string") {
    throw new Error("Country code must be a non-empty string.");
  }

  // Trim whitespace, convert to uppercase, and validate format
  const formattedCode = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(formattedCode)) {
    throw new Error("Country code must consist of exactly two uppercase letters.");
  }

  // Convert each character to a regional indicator symbol
  const codePoints = Array.from(formattedCode).map(
    (char) => 127397 + char.charCodeAt(0)
  );

  return String.fromCodePoint(...codePoints);
}
