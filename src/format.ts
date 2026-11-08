/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56", "$-50.00", "€1,000.00"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currency] || (currency ? currency + " " : "");

  const isNegative = amount < 0 || Object.is(amount, -0);
  const absAmount = Math.abs(amount);

  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * Supports $, €, £, and general currency prefixes/symbols,
 * thousands separators, and negative amounts.
 *
 * @param str - String like "$1,234.56", "$-50.00", "€1,000.00", "£49.99"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  if (typeof str !== "string") {
    return NaN;
  }
  const trimmed = str.trim();
  if (!trimmed) {
    return NaN;
  }

  const isNegative = trimmed.includes("-") || (trimmed.startsWith("(") && trimmed.endsWith(")"));
  const cleaned = trimmed.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);

  if (isNaN(value)) {
    return NaN;
  }

  return isNegative ? -value : value;
}
