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

  const negative = amount < 0;
  const abs = Math.abs(amount);
  // Always two decimal places; en-US grouping
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Negative: "$-50.00" per bounty acceptance criteria
  return negative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56" or "€1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip common currency symbols and grouping commas
  const cleaned = str
    .replace(/[$€£¥]/g, "")
    .replace(/,/g, "")
    .trim();
  return parseFloat(cleaned);
}
