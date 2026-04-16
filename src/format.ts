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

  // Handle negative numbers: show "-$50.00" not "$-50.00"
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Always show exactly 2 decimal places
  const absFormatted = absAmount.toFixed(2);
  const withCommas = parseFloat(absFormatted).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const result = `${symbol}${withCommas}`;
  return isNegative ? `-${result}` : result;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56" or "€1.234,56" or "£1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip all common currency symbols and whitespace
  const cleaned = str
    .replace(/[$€£¥¥]/g, "")          // strip currency symbols
    .replace(/\s/g, "")              // strip whitespace
    .replace(/,/g, "");              // strip thousand separators
  return parseFloat(cleaned);
}
