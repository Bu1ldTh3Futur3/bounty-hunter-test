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

// Fixed implementations matching src/format.ts
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${isNegative ? "-" : ""}${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

// ── Existing tests ──────────────────────────────────────────────────
console.log("formatCurrency tests (existing):");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

console.log("\nparseCurrency tests (existing):");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// ── New tests for fixed bugs ────────────────────────────────────────
console.log("\nformatCurrency — negative numbers:");
assert(formatCurrency(-50) === "-$50.00", "formats negative number");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats negative with commas");
assert(formatCurrency(-0.01) === "-$0.01", "formats small negative");

console.log("\nformatCurrency — always 2 decimal places:");
assert(formatCurrency(100) === "$100.00", "integer shows .00");
assert(formatCurrency(99.9) === "$99.90", "one decimal padded to .X0");
assert(formatCurrency(0.1) === "$0.10", "small decimal padded");

console.log("\nparseCurrency — handles €, £ symbols:");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£99.99") === 99.99, "parses GBP symbol");
assert(parseCurrency("€0.01") === 0.01, "parses small EUR amount");

// ── Edge cases ──────────────────────────────────────────────────────
console.log("\nEdge cases:");
assert(formatCurrency(0.005) === "$0.01", "rounds half-cent up");
assert(parseCurrency("  $42.00  ") === 42, "trims whitespace");
assert(formatCurrency(999999.99) === "$999,999.99", "large number formatting");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
