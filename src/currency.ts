/**
 * Format a number as a currency string with 2 decimal places.
 * Negative numbers are formatted as "$-50.00".
 */
export function formatCurrency(amount: number): string {
  if (amount < 0) {
    return `$-${Math.abs(amount).toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
}

/**
 * Parse a currency string (with $, €, or £ symbol and optional commas)
 * into a number.
 */
export function parseCurrency(value: string): number {
  const stripped = value.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(stripped);
}
