/**
 * Formats a numeric amount as a currency string.
 *
 * Fixes:
 *  - Bug #1: negative numbers now render correctly (e.g. "$-50.00" instead of "-$50.00")
 *  - Bug #2: always shows exactly 2 decimal places (e.g. "$100.00" instead of "$100")
 *
 * @param amount  - The numeric amount to format.
 * @param symbol  - The currency symbol to prepend (default: "$").
 * @returns Formatted currency string, e.g. "$9.99", "$-50.00", "€100.00".
 */
export function formatCurrency(amount: number, symbol: string = "$"): string {
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Parses a formatted currency string back into a number.
 *
 * Supports $, €, and £ symbols and handles negative values.
 *
 * @param value - A currency string such as "$9.99", "€-50.00", "£1234.56".
 * @returns The parsed numeric value.
 */
export function parseCurrency(value: string): number {
  // Strip any leading currency symbol(s) then parse
  const stripped = value.replace(/^[^\d\-]+/, "");
  return parseFloat(stripped);
}
