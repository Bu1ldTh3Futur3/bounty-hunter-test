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

  const absFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sign = amount < 0 ? "-" : "";
  return `${symbol}${sign}${absFormatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56", "€1,234.56", "£500", or "$-50.00"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}
