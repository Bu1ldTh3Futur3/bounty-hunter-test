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
  const absAmount = Math.abs(amount);

  const fixed = absAmount.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatted = `${formattedInt}.${decPart}`;

  return isNegative ? `${symbol}-${formatted}` : `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$€£¥₹₩₽]/g, "").replace(/,/g, "").trim();
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimal places");
assert(formatCurrency(100) === "$100.00", "always shows 2 decimal places (100 -> $100.00)");
assert(formatCurrency(-50) === "$-50.00", "handles negative numbers correctly");
assert(formatCurrency(-1234.56) === "$-1,234.56", "handles negative numbers with thousands separator");
assert(formatCurrency(0.5) === "$0.50", "handles amounts less than 1");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic USD amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR (€) amounts");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP (£) amounts");
assert(parseCurrency("€999.99") === 999.99, "parses EUR without thousands separator");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
