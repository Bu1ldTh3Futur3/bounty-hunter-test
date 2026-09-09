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

  // Always show 2 decimal places; negatives keep their sign right after
  // the symbol (e.g. "$-50.00") per the acceptance criteria.
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56" or "€1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip any known currency symbol (or "<CODE> " prefix) and thousands separators.
  const cleaned = str
    .replace(/^(USD|EUR|GBP)\s?/i, "")
    .replace(/[$€£]/g, "")
    .replace(/,/g, "");
  return parseFloat(cleaned);
}
