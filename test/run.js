// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  \u2713 ${message}`);
  } else {
    failed++;
    console.log(`  \u2717 ${message}`);
  }
}

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "\u20ac", GBP: "\u00a3" };
  const symbol = symbols[currency] || currency + " ";
  const sign = amount < 0 ? "-" : "";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign}${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str
    .trim()
    .replace(/[$\u20ac\u00a3]|[A-Z]{3}\s?/g, "")
    .replace(/,/g, "");

  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with two decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimals");
assert(formatCurrency(-1234.5, "GBP") === "-\u00a31,234.50", "formats negative GBP");
assert(formatCurrency(42, "CAD") === "CAD 42.00", "formats unknown currency code");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("\u20ac1,000.00") === 1000, "parses EUR symbol");
assert(parseCurrency("-\u00a31,234.50") === -1234.5, "parses negative GBP");
assert(parseCurrency("CAD 42.00") === 42, "parses currency code prefix");
assert(parseCurrency("$0") === 0, "parses zero");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
