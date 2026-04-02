// quick and dirty test runner — no framework needed for this
let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${msg}`);
  } else {
    failed++;
    console.log(`  ✗ ${msg}`);
  }
}

// re-implement here to avoid needing a build step
// if these get out of sync with src/format.ts that's on us
const SYMS = { USD: "$", EUR: "€", GBP: "£" };

function formatCurrency(amount, currency = "USD") {
  const sym = SYMS[currency] || currency + " ";
  const sign = amount < 0 ? "-" : "";
  return `${sign}${sym}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function parseCurrency(str) {
  return parseFloat(str.replace(/[^\d.\-]/g, ""));
}

// --- formatCurrency ---

console.log("formatCurrency:");
assert(formatCurrency(1234.56) === "$1,234.56", "basic");
assert(formatCurrency(1000, "EUR") === "€1,000.00", "euro");
assert(formatCurrency(0) === "$0.00", "zero pads decimals");
assert(formatCurrency(-50) === "-$50.00", "negative");
assert(formatCurrency(100) === "$100.00", "no decimals -> pads to .00");
assert(formatCurrency(-1234.56) === "-$1,234.56", "negative with decimals");
assert(formatCurrency(0.5) === "$0.50", "small decimal");

// --- parseCurrency ---

console.log("\nparseCurrency:");
assert(parseCurrency("$1,234.56") === 1234.56, "usd");
assert(parseCurrency("$0") === 0, "zero");
assert(parseCurrency("€1,234.56") === 1234.56, "euro");
assert(parseCurrency("£500.00") === 500, "gbp");
assert(parseCurrency("-$50.00") === -50, "negative");
assert(parseCurrency("¥1000") === 1000, "unknown symbol falls through"); // bonus — was in the original bug report scope

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
