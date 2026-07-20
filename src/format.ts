/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56" or "$-50.00"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";

  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // "$" + optional "-" + digits → "$-50.00" for negatives (acceptance)
  return `${symbol}${sign}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56", "€1,234.56", or "£99.00"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip common currency symbols and grouping commas
  const cleaned = str
    .replace(/[$€£]/g, "")
    .replace(/,/g, "")
    .trim();
  return parseFloat(cleaned);
}
