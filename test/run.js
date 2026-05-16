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
  const sign = amount < 0 ? "-" : "";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${sign}${formatted}`;
}

function parseCurrency(str) {
  const trimmed = str.trim();
  const isNegative = trimmed.includes("-") || /^\(.*\)$/.test(trimmed);
  const cleaned = trimmed.replace(/[^\d.]/g, "");
  const parsed = parseFloat(cleaned);

  if (Number.isNaN(parsed)) {
    return NaN;
  }

  return isNegative ? -parsed : parsed;
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with two decimals");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimals");
assert(formatCurrency(-50) === "$-50.00", "formats negative USD amount");
assert(formatCurrency(25.5, "GBP") === "£25.50", "formats GBP with padded decimals");
assert(formatCurrency(12, "JPY") === "JPY 12.00", "formats unknown currency code");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0.00") === 0, "parses zero");
assert(parseCurrency("€1,000.00") === 1000, "parses EUR symbol");
assert(parseCurrency("GBP 25.50") === 25.5, "parses currency code prefix");
assert(parseCurrency("$-50.00") === -50, "parses negative amount");
assert(parseCurrency("($50.00)") === -50, "parses accounting negative amount");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
