// Simple test runner for ATLAS
const { formatCurrency, parseCurrency } = require('../dist/format.js');

let passed = 0;
let failed = 0;

function assert(actual, expected, message) {
  if (actual === expected) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.log(`  ✗ ${message} (Expected: ${expected}, Got: ${actual})`);
  }
}

console.log("formatCurrency Fix Verification:");
assert(formatCurrency(1234.56), "$1,234.56", "formats basic amount");
assert(formatCurrency(-50), "-$50.00", "formats negative amount correctly");
assert(formatCurrency(100), "$100.00", "always shows 2 decimal places");
assert(formatCurrency(0), "$0.00", "formats zero correctly");

console.log("\nparseCurrency Fix Verification:");
assert(parseCurrency("$1,234.56"), 1234.56, "parses basic USD amount");
assert(parseCurrency("€1,234.56"), 1234.56, "parses EUR amount");
assert(parseCurrency("£1,234.56"), 1234.56, "parses GBP amount");
assert(parseCurrency("-$50.00"), -50, "parses negative USD amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
