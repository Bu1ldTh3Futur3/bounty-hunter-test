/**
 * Format a number as a currency string.
 * 
 * @param amount - The amount to format (handles negative values)
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
  
  // Handle negative amounts
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Always show 2 decimal places
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * Handles $, €, £ and other currency symbols.
 * 
 * @param str - String like "$1,234.56" or "€1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip common currency symbols ($, €, £) and any non-numeric chars except . and -
  const cleaned = str.replace(/[$\u20ac\u00a3]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}
