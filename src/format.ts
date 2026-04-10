/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";

  // Handle negative numbers by working with absolute value, then re-apply sign
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Format with always 2 decimal places, then add thousands separator
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Re-apply negative sign if needed
  const result = `${symbol}${isNegative ? "-" : ""}${formatted}`;
  return result;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip common currency symbols ($, €, £) and commas
  const cleaned = str
    .replace(/[$€£]/g, "")
    .replace(/,/g, "")
    .trim();
  return parseFloat(cleaned);
}
