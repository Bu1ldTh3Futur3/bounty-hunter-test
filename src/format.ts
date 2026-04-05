/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || currency + " ";

  // Handle negative numbers: format the absolute value, then prepend "-"
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  // Always show exactly 2 decimal places
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${isNegative ? "-" : ""}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56", "€1,234.56", or "£1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip all known currency symbols ($, €, £) and commas
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}
