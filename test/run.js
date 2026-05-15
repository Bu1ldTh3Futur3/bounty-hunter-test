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

const { formatCurrency, parseCurrency } = require("../dist/format.js");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(100) === "$100.00", "always shows two decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative amount");
assert(formatCurrency(-50.5, "GBP") === "£-50.50", "formats negative GBP amount");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0.00") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP amount");
assert(parseCurrency("$-50.50") === -50.5, "parses symbol-prefixed negative amount");
assert(parseCurrency("-$50.50") === -50.5, "parses sign-prefixed negative amount");
assert(Number.isNaN(parseCurrency("invalid")), "returns NaN for invalid input");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
