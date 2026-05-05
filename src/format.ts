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

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  const formatted = absoluteAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  return `${isNegative ? "-" : ""}${symbol}${formatted}`;
}

/**
 * Parse a currency string back to a number.
 * 
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
export function parseCurrency(str: string): number {
  const cleaned = str.replace(/[^0-9.-]+/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

// Tests
export function testFormatCurrency() {
  console.assert(formatCurrency(1234.56) === "$1,234.56", "Test Case 1 Failed");
  console.assert(formatCurrency(-1234.56) === "-$1,234.56", "Test Case 2 Failed");
  console.assert(formatCurrency(1234, "EUR") === "€1,234.00", "Test Case 3 Failed");
  console.assert(formatCurrency(-1234, "GBP") === "-£1,234.00", "Test Case 4 Failed");
  console.assert(formatCurrency(0, "USD") === "$0.00", "Test Case 5 Failed");
}

export function testParseCurrency() {
  console.assert(parseCurrency("$1,234.56") === 1234.56, "Test Case 1 Failed");
  console.assert(parseCurrency("-$1,234.56") === -1234.56, "Test Case 2 Failed");
  console.assert(parseCurrency("€1,234.00") === 1234.00, "Test Case 3 Failed");
  console.assert(parseCurrency("-£1,234.00") === -1234.00, "Test Case 4 Failed");
  console.assert(parseCurrency("USD 0.00") === 0.00, "Test Case 5 Failed");
}

// Run tests
testFormatCurrency();
testParseCurrency();
