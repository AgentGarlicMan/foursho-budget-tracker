/**
 * Formats a numeric amount as Philippine Peso currency.
 * Example: formatCurrency(1500) => "₱1,500.00"
 */
export function formatCurrency(amount: number): string {
  return '₱' + amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
