// Simple test runner - no external dependencies required
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Compile TypeScript first
try {
  execSync("npx tsc --outDir dist --module commonjs --target es2017 --esModuleInterop true src/currency.ts", {
    stdio: "inherit",
    cwd: path.join(__dirname, "..")
  });
} catch (e) {
  console.error("TypeScript compilation failed");
  process.exit(1);
}

const { formatCurrency, parseCurrency } = require("../dist/currency");

let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  if (actual === expected) {
    console.log(`  PASS: ${description}`);
    passed++;
  } else {
    console.error(`  FAIL: ${description}`);
    console.error(`    Expected: ${JSON.stringify(expected)}`);
    console.error(`    Actual:   ${JSON.stringify(actual)}`);
    failed++;
  }
}

console.log("\n=== formatCurrency tests ===");

// Existing behavior
assert("formatCurrency(0) returns '$0.00'", formatCurrency(0), "$0.00");
assert("formatCurrency(1.5) returns '$1.50'", formatCurrency(1.5), "$1.50");
assert("formatCurrency(9.99) returns '$9.99'", formatCurrency(9.99), "$9.99");

// Bug fixes
assert("formatCurrency(100) returns '$100.00'", formatCurrency(100), "$100.00");
assert("formatCurrency(-50) returns '$-50.00'", formatCurrency(-50), "$-50.00");
assert("formatCurrency(-0.5) returns '$-0.50'", formatCurrency(-0.5), "$-0.50");
assert("formatCurrency(1234.5) returns '$1234.50'", formatCurrency(1234.5), "$1234.50");

console.log("\n=== parseCurrency tests ===");

// Existing behavior
assert("parseCurrency('$1.00') returns 1", parseCurrency("$1.00"), 1);
assert("parseCurrency('$9.99') returns 9.99", parseCurrency("$9.99"), 9.99);

// Bug fixes
assert("parseCurrency('€1,234.56') returns 1234.56", parseCurrency("€1,234.56"), 1234.56);
assert("parseCurrency('£99.99') returns 99.99", parseCurrency("£99.99"), 99.99);
assert("parseCurrency('$1,000.00') returns 1000", parseCurrency("$1,000.00"), 1000);

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
}
