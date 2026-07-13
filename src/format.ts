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
  
  // BUG: doesn't handle negative numbers correctly
  // BUG: doesn't handle zero decimal places (shows "$100" not "$100.00")
  const formatted = amount && amount.toLocaleString("en-US");
  return `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // BUG: doesn't strip currency symbols properly — only strips $
  const cleaned = str && str.replace("$", "").replace(/,/g, "");
  return parseFloat(cleaned);
}
