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

// Updated implementation to match fix
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency + " ";
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = isNegative ? "-" : "";
  return `${symbol}${sign}${absAmount}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[$,€,£]/g, "").replace(/,/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "formats EUR with 2 decimals");
assert(formatCurrency(100) === "$100.00", "formats 100 with 2 decimals (BOUNTY REQ)");
assert(formatCurrency(-50) === "$-50.00", "formats negative (BOUNTY REQ)");
assert(formatCurrency(0) === "$0.00", "formats zero with 2 decimals");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("€1,234.56") === 1234.56, "parses EUR (BOUNTY REQ)");
assert(parseCurrency("£1,234.56") === 1234.56, "parses GBP (BOUNTY REQ)");
assert(parseCurrency("$0") === 0, "parses zero");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
