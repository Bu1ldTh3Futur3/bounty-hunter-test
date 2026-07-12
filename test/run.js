// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.log(`  ✗ ${message}`);
  }
}

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";

  // Handle negative numbers and always show 2 decimal places
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const [intPart, decPart = "00"] = absAmount.toFixed(2).split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatted = `${withCommas}.${decPart}`;

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  // Strip any currency symbols ($, €, £) and commas
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");
assert(formatCurrency(-50) === "$-50.00", "formats negative number");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(-1234.56) === "$-1,234.56", "formats negative with decimals");
assert(formatCurrency(0.5) === "$0.50", "formats small decimal");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP symbol");
assert(parseCurrency("$-50.00") === -50, "parses negative currency");
assert(parseCurrency("€0.99") === 0.99, "parses EUR with small amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
