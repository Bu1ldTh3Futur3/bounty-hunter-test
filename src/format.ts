/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
    const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
    });
    return formatter.format(amount);
}

/**
 * Parse a currency string into a number.
 *
 * @param value - The string to parse
 * @returns The parsed number
 */
export function parseCurrency(value: string): number {
    if (!value) return 0;
    // This strips all non-numeric characters except for periods and minus signs
  const cleaned = value.replace(/[^0-9.-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}
