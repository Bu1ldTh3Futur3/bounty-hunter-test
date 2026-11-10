// Simple test runner — imports the real implementation from src/format.ts
import { formatCurrency, parseCurrency } from "../src/format.ts";

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
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR (2 decimals)");
assert(formatCurrency(0) === "$0.00", "formats zero (2 decimals)");
assert(formatCurrency(100) === "$100.00", "always 2 decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative number");
assert(formatCurrency(-1234.5, "GBP") === "£-1,234.50", "formats negative GBP");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£99.99") === 99.99, "parses GBP symbol");
assert(parseCurrency("$-50.00") === -50, "parses negative amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
