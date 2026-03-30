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
  
  // Always format with exactly 2 decimal places
  const absFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  // Handle negative: prefix with - before the symbol
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${absFormatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip any currency symbol ($, €, £) and commas
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}
