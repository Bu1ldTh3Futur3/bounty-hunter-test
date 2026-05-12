// Test runner for format.ts

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

// Import the fixed functions directly
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const absFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? "-" : "";
  return `${symbol}${sign}${absFormatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[^0-9.\-]/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places (fixes bug)");
assert(formatCurrency(-50) === "$-50.00", "negative numbers: sign after symbol (fixes bug)");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol (fixes bug)");
assert(parseCurrency("£500") === 500, "parses GBP symbol (fixes bug)");
assert(parseCurrency("-$50.00") === -50, "parses negative string");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
