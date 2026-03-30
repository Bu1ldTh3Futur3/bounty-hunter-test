// @ts-check
"use strict";

const assert = require("assert");
const path = require("path");

// ---------------------------------------------------------------------------
// Load the currency implementation.
// We support both the compiled JS output (dist/currency.js) and a direct
// require via ts-node/register if available, falling back to a plain require
// of the TS source so that environments with ts-node work transparently.
// ---------------------------------------------------------------------------
let formatCurrency, parseCurrency;

try {
  // Try compiled output first (produced by `tsc`)
  ({ formatCurrency, parseCurrency } = require("../dist/currency"));
} catch (_) {
  try {
    // Try ts-node/register so we can require the TS source directly
    require("ts-node/register");
    ({ formatCurrency, parseCurrency } = require("../src/currency"));
  } catch (__) {
    console.error(
      "Could not load currency module. Run `npx tsc` first or install ts-node.",
    );
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// formatCurrency tests
// ---------------------------------------------------------------------------

// existing behaviour
assert.strictEqual(
  formatCurrency(50),
  "$50.00",
  "formats a basic positive integer with $ symbol",
);

assert.strictEqual(
  formatCurrency(9.99),
  "$9.99",
  "formats a positive float with $ symbol",
);

assert.strictEqual(
  formatCurrency(0),
  "$0.00",
  "formats zero",
);

assert.strictEqual(
  formatCurrency(9.99, "€"),
  "€9.99",
  "accepts a custom € currency symbol",
);

assert.strictEqual(
  formatCurrency(9.99, "£"),
  "£9.99",
  "accepts a custom £ currency symbol",
);

// Bug #2 — always shows 2 decimal places
assert.strictEqual(
  formatCurrency(100),
  "$100.00",
  "always shows 2 decimal places for 100 (bug #2)",
);

assert.strictEqual(
  formatCurrency(1),
  "$1.00",
  "always shows 2 decimal places for 1 (bug #2)",
);

assert.strictEqual(
  formatCurrency(1000),
  "$1000.00",
  "always shows 2 decimal places for 1000 (bug #2)",
);

// Bug #1 — negative numbers
assert.strictEqual(
  formatCurrency(-50),
  "$-50.00",
  "handles negative integers correctly (bug #1)",
);

assert.strictEqual(
  formatCurrency(-0.99),
  "$-0.99",
  "handles negative decimals correctly (bug #1)",
);

assert.strictEqual(
  formatCurrency(-1234.56),
  "$-1234.56",
  "handles large negative decimals correctly (bug #1)",
);

assert.strictEqual(
  formatCurrency(-99.99, "€"),
  "€-99.99",
  "handles negative numbers with custom symbol",
);

// ---------------------------------------------------------------------------
// parseCurrency tests
// ---------------------------------------------------------------------------

assert.strictEqual(
  parseCurrency("$50.00"),
  50,
  "parses a basic $ string",
);

assert.strictEqual(
  parseCurrency("$9.99"),
  9.99,
  "parses a float $ string",
);

assert.strictEqual(
  parseCurrency("$0.00"),
  0,
  "parses zero",
);

assert.strictEqual(
  parseCurrency("€9.99"),
  9.99,
  "parses a € string",
);

assert.strictEqual(
  parseCurrency("£9.99"),
  9.99,
  "parses a £ string",
);

assert.strictEqual(
  parseCurrency("$-50.00"),
  -50,
  "parses a negative $ string (bug #1 round-trip)",
);

assert.strictEqual(
  parseCurrency("€-99.99"),
  -99.99,
  "parses a negative € string",
);

assert.strictEqual(
  parseCurrency("£-1234.56"),
  -1234.56,
  "parses a negative £ string",
);

// ---------------------------------------------------------------------------
// Round-trip tests
// ---------------------------------------------------------------------------

[50, -50, 9.99, -9.99, 0, 100, 1000, -1234.56].forEach((amount) => {
  assert.strictEqual(
    parseCurrency(formatCurrency(amount)),
    amount,
    `round-trip: parseCurrency(formatCurrency(${amount})) === ${amount}`,
  );
});

console.log("All tests passed.");
