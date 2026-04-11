const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

/**
 * Format a number as a currency string.
 * Negative amounts are represented as "${symbol}-${amount}", e.g. "$-50.00".
 * Always displays exactly 2 decimal places.
 *
 * @param amount - The amount to format (may be negative)
 * @param currency - ISO 4217 currency code (default: "USD")
 * @returns Formatted string like "$1,234.56", "$100.00", or "$-50.00"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency + " ";
    return `${symbol}0.00`;
  }

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency + " ";

  const absFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return amount < 0 ? `${symbol}-${absFormatted}` : `${symbol}${absFormatted}`;
}

/**
 * Parse a currency string back to a number.
 * Handles common symbols ($, €, £), thousands separators, and decimal points.
 *
 * @param str - String like "$1,234.56", "€1,234.56", or "£99.99"
 * @returns The numeric value, or NaN if unparseable
 */
export function parseCurrency(str: string): number {
  // Remove known currency symbols and spaces
  const withoutSymbol = str.replace(/[$€£\s]/g, "");
  // Remove thousands separators (commas used as grouping)
  const withoutThousands = withoutSymbol.replace(/,/g, "");
  return parseFloat(withoutThousands);
}
