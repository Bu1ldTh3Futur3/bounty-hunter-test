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
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");
assert(formatCurrency(42, "GBP") === "\u00a342.00", "formats GBP");
assert(formatCurrency(12.5, "CHF") === "CHF 12.50", "formats unknown currency code");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR amounts");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP amounts");
assert(parseCurrency("$-50.00") === -50, "parses negative amounts");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
