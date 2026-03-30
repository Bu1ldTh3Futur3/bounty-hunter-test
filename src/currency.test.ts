/**
 * NOTE: These tests are ported into test/run.js (plain Node assert) so they
 * are executed by `npm test` without requiring Jest/Vitest.
 *
 * This file is kept as a TypeScript reference / IDE companion only.
 * To run all tests: npm test
 */

import { formatCurrency, parseCurrency } from "./currency";

// The actual assertions live in test/run.js and are run via `npm test`.
// Below is a readable TypeScript mirror for documentation purposes.

// formatCurrency — existing behaviour
// formatCurrency(50)       => "$50.00"
// formatCurrency(9.99)     => "$9.99"
// formatCurrency(0)        => "$0.00"
// formatCurrency(9.99,"€") => "€9.99"
// formatCurrency(9.99,"£") => "£9.99"

// formatCurrency — bug #2 (always 2 decimal places)
// formatCurrency(100)  => "$100.00"
// formatCurrency(1)    => "$1.00"
// formatCurrency(1000) => "$1000.00"

// formatCurrency — bug #1 (negative numbers)
// formatCurrency(-50)      => "$-50.00"
// formatCurrency(-0.99)    => "$-0.99"
// formatCurrency(-1234.56) => "$-1234.56"
// formatCurrency(-99.99,"€") => "€-99.99"

// parseCurrency
// parseCurrency("$50.00")   => 50
// parseCurrency("$9.99")    => 9.99
// parseCurrency("$0.00")    => 0
// parseCurrency("€9.99")    => 9.99
// parseCurrency("£9.99")    => 9.99
// parseCurrency("$-50.00")  => -50
// parseCurrency("€-99.99")  => -99.99
// parseCurrency("£-1234.56")=> -1234.56
