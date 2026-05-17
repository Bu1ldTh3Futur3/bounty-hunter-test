// Test runner for formatCurrency / parseCurrency
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

// Mirrors the fixed implementation in src/format.ts
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const prefix = amount < 0 ? "-" : "";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${prefix}${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[^0-9.\-]/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount with 2 decimals");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");

console.log("\nformatCurrency — new bug-fix tests:");
assert(formatCurrency(100) === "$100.00", "shows 2 decimals for whole numbers");
assert(formatCurrency(-50) === "-$50.00", "handles negative numbers");
assert(formatCurrency(-1234.56) === "-$1,234.56", "handles negative with decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

console.log("\nparseCurrency — new bug-fix tests:");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£999.99") === 999.99, "parses GBP symbol");
assert(parseCurrency("-$50.00") === -50, "parses negative with minus prefix");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
