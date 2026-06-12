/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string with two decimal places, like "$1,234.56" or "-$50.00"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${amount < 0 ? "-" : ""}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - Currency text such as "$1,234.56", "€1,234.56", or "USD 1,234.56"
 * @returns The numeric value, or NaN when the normalized format is invalid
 */
export function parseCurrency(str: string): number {
  const cleaned = str.replace(/,/g, "").replace(/[^\d.-]/g, "");
  if (!/^-?(?:\d+|\d+\.\d*|\.\d+)$/.test(cleaned)) {
    return NaN;
  }
  return Number(cleaned);
}
