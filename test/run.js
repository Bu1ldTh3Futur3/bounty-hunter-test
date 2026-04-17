// Simple test runner — exercises the compiled source from ../dist
// so tests stay in sync with the actual implementation.
const { formatCurrency, parseCurrency } = require("../dist/format.js");

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

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount with thousand separator");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative number (issue acceptance criterion)");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places for whole numbers (issue acceptance criterion)");
assert(formatCurrency(-1234.5, "EUR") === "€-1,234.50", "formats negative EUR with thousand separator and pads decimal");
assert(formatCurrency(99.999) === "$100.00", "rounds correctly to 2 decimals");
assert(formatCurrency(0.1) === "$0.10", "pads single decimal place");
assert(formatCurrency(-0.05, "GBP") === "£-0.05", "formats small negative GBP");
assert(formatCurrency(1000, "JPY") === "JPY 1,000.00", "falls back to currency code prefix for unknown symbols");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses USD amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount with € (issue acceptance criterion)");
assert(parseCurrency("£500") === 500, "parses GBP amount with £");
assert(parseCurrency("$-50.00") === -50, "parses negative USD");
assert(parseCurrency("€1,000,000.99") === 1000000.99, "parses large EUR amount");
assert(parseCurrency("  $42.10  ") === 42.10, "trims whitespace");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
