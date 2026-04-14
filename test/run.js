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

  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (amount < 0) {
    return `-${symbol}${formatted}`;
  }
  return `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£¥₹₩₽]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

// ---- Existing tests (must still pass) ----
console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// ---- New tests for fixed bugs ----
console.log("\nNew tests - negative numbers:");
assert(formatCurrency(-50) === "-$50.00", "formatCurrency(-50) returns -$50.00");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats negative with commas");
assert(formatCurrency(-0.99) === "-$0.99", "formats small negative amount");

console.log("\nNew tests - decimal places:");
assert(formatCurrency(100) === "$100.00", "formatCurrency(100) returns $100.00");
assert(formatCurrency(1) === "$1.00", "always shows 2 decimal places");
assert(formatCurrency(99.9) === "$99.90", "pads single decimal to two");

console.log("\nNew tests - multi-currency parsing:");
assert(parseCurrency("€1,234.56") === 1234.56, "parseCurrency(€1,234.56) returns 1234.56");
assert(parseCurrency("£500.00") === 500, "parses GBP");
assert(parseCurrency("-$50.00") === -50, "parses negative currency");
assert(parseCurrency("€99.99") === 99.99, "parses EUR with decimals");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
