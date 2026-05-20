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

  const absAmount = Math.abs(amount);
  const parts = absAmount.toFixed(2).split(".");
  const integerPart = parseInt(parts[0]).toLocaleString("en-US");
  const formatted = `${integerPart}.${parts[1]}`;
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56", "€1.234,56", etc.
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  const cleaned = str
    .replace(/[^\d.,-]/g, "")
    .replace(/,/g, "");
  return parseFloat(cleaned);
}
