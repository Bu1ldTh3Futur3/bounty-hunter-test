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

// npm test compiles the production source before this runner imports it.
const { formatCurrency, parseCurrency } = require("../dist/format.js");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

assert(formatCurrency(-50) === "$-50.00", "formats negative amount");
assert(formatCurrency(100) === "$100.00", "always includes two decimals");
assert(formatCurrency(0.1) === "$0.10", "pads fractional amount");
assert(formatCurrency(1234.567) === "$1,234.57", "rounds to two decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP");
assert(parseCurrency("£-42.50") === -42.5, "parses negative currency");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
