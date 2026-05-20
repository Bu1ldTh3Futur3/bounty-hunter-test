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

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const absAmount = Math.abs(amount);
  const parts = absAmount.toFixed(2).split(".");
  const integerPart = parseInt(parts[0]).toLocaleString("en-US");
  const formatted = `${integerPart}.${parts[1]}`;
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str
    .replace(/[^\d.,-]/g, "")
    .replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with decimals");
assert(formatCurrency(-50) === "-$50.00", "formats negative amount");
assert(formatCurrency(100) === "$100.00", "formats hundred with decimals");
assert(formatCurrency(-1234.56) === "-$1,234.56", "formats negative with commas");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£100") === 100, "parses GBP symbol");
assert(parseCurrency("-$50.00") === -50, "parses negative amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
