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

// npm's pretest builds the source so these checks exercise the real implementation.
const { formatCurrency, parseCurrency } = require("../dist/format.js");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with two decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts");
assert(formatCurrency(100) === "$100.00", "formats integer amounts");
assert(formatCurrency(1.239, "GBP") === "£1.24", "rounds fractional GBP amounts");
assert(formatCurrency(-1234.56, "EUR") === "€-1,234.56", "formats grouped negative EUR amounts");
assert(formatCurrency(100, "CAD") === "CAD 100.00", "preserves unknown currency prefix");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR and grouping separators");
assert(parseCurrency("£-1,234.56") === -1234.56, "parses negative GBP amounts");
assert(parseCurrency("  £0.50  ") === 0.5, "preserves whitespace handling");
assert(parseCurrency("$1,234,567.89") === 1234567.89, "removes every grouping separator");
assert(Number.isNaN(parseCurrency("invalid")), "preserves NaN for invalid input");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
