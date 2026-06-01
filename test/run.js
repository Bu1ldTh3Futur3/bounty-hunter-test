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
assert(formatCurrency(100) === "$100.00", "formats whole USD amount with cents");
assert(formatCurrency(-50) === "$-50.00", "formats negative USD amount");
assert(formatCurrency(-1234.5) === "$-1,234.50", "formats grouped negative USD amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with cents");
assert(formatCurrency(1234.56, "JPY") === "JPY 1,234.56", "formats unknown currency code");
assert(formatCurrency(0) === "$0.00", "formats zero with cents");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR amount");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP amount");
assert(parseCurrency("$-1,234.50") === -1234.5, "parses negative USD amount");
assert(parseCurrency("JPY 1,234.56") === 1234.56, "parses unknown currency code amount");
assert(parseCurrency(formatCurrency(-1234.56, "JPY")) === -1234.56, "round-trips unknown currency code amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
