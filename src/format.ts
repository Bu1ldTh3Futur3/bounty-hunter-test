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

  // Handle negative numbers and always show 2 decimal places
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const [intPart, decPart = "00"] = absAmount.toFixed(2).split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatted = `${withCommas}.${decPart}`;

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56", "€1,234.56", or "£1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip any currency symbols ($, €, £) and commas
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}
