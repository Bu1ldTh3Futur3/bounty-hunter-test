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
    const absFormatted = Math.abs(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${symbol}${isNegative ? "-" : ""}${absFormatted}`;
}
/**
 * Parse a currency string back to a number.
 *
 * @param str - String like "$1,234.56"
 * @returns The numeric value
 */
function parseCurrency(str) {
    const cleaned = str.replace(/[$€£]/g, "").replace(/,/g, "");
    return parseFloat(cleaned);
}
