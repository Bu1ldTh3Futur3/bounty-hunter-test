"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.parseCurrency = parseCurrency;
/**
 * Format a number as a currency string.
 *
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @returns Formatted string like "$1,234.56"
 */
function formatCurrency(amount, currency = "USD") {
    const symbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
    };
    const symbol = symbols[currency] || currency + " ";
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    // Format: -$1,234.56 or $1,234.56
    return `${isNegative ? "-" : ""}${symbol}${formatted}`;
}
/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
function parseCurrency(str) {
    // Strip currency symbols and commas, keep decimals and minus sign
    const cleaned = str.replace(/[^\d.-]/g, "");
    return parseFloat(cleaned);
}
