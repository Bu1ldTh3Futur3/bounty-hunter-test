export function formatCurrency(amount: number, currency: string = "USD"): string {
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] || currency + " ";
  const sign = amount < 0 ? "-" : "";
  // toLocaleString doesn't pad decimals by default
  return `${sign}${sym}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function parseCurrency(str: string): number {
  // strips everything that isn't a digit, dot, or minus — handles €, £, $, whatever
  return parseFloat(str.replace(/[^\d.\-]/g, ""));
}
