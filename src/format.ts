/**
 * Format a number as a currency string.
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: "USD")
 * @returns {string} Formatted string like "$1,234.56"
 */
export function formatCurrency(amount, currency = "USD") {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";
  const isNegative = amount < 0;
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol}${isNegative ? "-" : ""}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * @param {string} str - String like "$1,234.56"
 * @returns {number} The numeric value
 */
export function parseCurrency(str) {
  const cleaned = str.replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned);
}
