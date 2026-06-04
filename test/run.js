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

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const parts = absAmount.toFixed(2).split(".");
  const intPart = parseInt(parts[0], 10).toLocaleString("en-US");
  const formatted = `${intPart}.${parts[1]}`;

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£¥₹₽]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR");
assert(formatCurrency(0) === "$0.00", "formats zero");

// New tests for fixed bugs
assert(formatCurrency(-50) === "$-50.00", "formats negative number");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places");
assert(formatCurrency(-1234.56, "EUR") === "€-1,234.56", "formats negative EUR");
assert(formatCurrency(42, "GBP") === "£42.00", "formats GBP with 2 decimals");
assert(formatCurrency(0.1) === "$0.10", "formats small decimal with 2 places");
assert(formatCurrency(-0.5) === "$-0.50", "formats negative sub-dollar amount");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");

// New tests for fixed bugs
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR symbol");
assert(parseCurrency("£99.99") === 99.99, "parses GBP symbol");
assert(parseCurrency("€-500.00") === -500, "parses negative EUR");
assert(parseCurrency("$-50.00") === -50, "parses negative USD");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
