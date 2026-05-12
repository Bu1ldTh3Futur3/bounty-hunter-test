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

const { formatCurrency, parseCurrency } = require("../dist/format");

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with cents");
assert(formatCurrency(0) === "$0.00", "formats zero with cents");
assert(formatCurrency(-42.5) === "-$42.50", "formats negative amounts");
assert(formatCurrency(99, "CAD") === "CAD 99.00", "formats unknown currencies");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0.00") === 0, "parses zero");
assert(parseCurrency("-€1,000.00") === -1000, "parses negative EUR");
assert(parseCurrency("GBP 42.50") === 42.5, "parses currency code prefix");
assert(parseCurrency("(CAD 15.25)") === -15.25, "parses accounting negatives");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
