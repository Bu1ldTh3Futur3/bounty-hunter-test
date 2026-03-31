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
  
  // FIX: handle decimal places by forcing minimum and maximum to 2
  // FIX: handle negative numbers correctly by formatting the absolute value and placing the sign before the symbol
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // FIX: handle multiple currency symbols and whitespace
  // Strips everything except digits, dots, and minus signs
  const cleaned = str.replace(/[^\d.-]/g, "");
  return parseFloat(cleaned);
}
