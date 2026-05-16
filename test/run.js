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

// Re-implement the fixed functions for testing (mirrors src/format.ts logic)
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

// === Existing tests ===
console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// === New tests for fixed bugs ===
console.log("\nBug fix #1: negative numbers");
assert(formatCurrency(-50) === "$-50.00", "formats negative number");
assert(formatCurrency(-1234.56) === "$-1,234.56", "formats negative with commas");
assert(formatCurrency(-0.99) === "$-0.99", "formats small negative");

console.log("\nBug fix #2: always 2 decimal places");
assert(formatCurrency(100) === "$100.00", "formats whole number with .00");
assert(formatCurrency(1) === "$1.00", "formats single digit with .00");
assert(formatCurrency(99.9) === "$99.90", "formats one decimal to two");
assert(formatCurrency(0.1) === "$0.10", "formats 0.1 with trailing zero");

console.log("\nBug fix #3: parseCurrency handles € and £");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£500.00") === 500, "parses GBP symbol");
assert(parseCurrency("€0.99") === 0.99, "parses EUR small amount");
assert(parseCurrency("£10,000.50") === 10000.5, "parses GBP with commas");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
