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
  
  // Always show exactly 2 decimal places
  const absFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Sign goes AFTER the currency symbol for negative amounts: $-50.00
  const sign = amount < 0 ? "-" : "";
  return `${symbol}${sign}${absFormatted}`;
}

/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56" or "€1.234,56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip all non-numeric characters except decimal point and minus sign
  const cleaned = str.replace(/[^0-9.\-]/g, "");
  return parseFloat(cleaned);
}
