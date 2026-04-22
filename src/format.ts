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
  
  // FIX: Force 2 decimal places and handle negative sign placement
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const sign = isNegative ? "-" : "";
  return `${symbol}${sign}${absAmount}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  // FIX: Handle multiple currency symbols (€, £) properly
  const cleaned = str.replace(/[$,€,£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}
