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
  
  // Handle negative numbers: format absolute value, prepend minus sign after symbol
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  // Always show 2 decimal places using toFixed and then add thousands separators
  const fixed = absAmount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatted = `${formattedInt}.${decPart}`;
  
  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // Strip all currency symbols ($, €, £, etc.) and commas
  const cleaned = str.replace(/[$€£¥₹₩₽]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}
