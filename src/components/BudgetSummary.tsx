import { Contribution, Expense } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface BudgetSummaryProps {
  contributions: Contribution[];
  expenses: Expense[];
}

export function BudgetSummary({ contributions, expenses }: BudgetSummaryProps) {
  const totalContributions = contributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const totalExpenses = expenses.reduce((sum, e) => sum + e.cost, 0);
  const remainingBudget = totalContributions - totalExpenses;
  const isPositive = remainingBudget >= 0;

  return (
    <section aria-label="Budget Summary" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
        Budget Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Contributions</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalContributions)}
          </p>
        </div>
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Expenses</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div
          className={`text-center p-3 rounded-lg ${
            isPositive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Remaining Budget</p>
          <p
            className={`text-xl sm:text-2xl font-bold ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {formatCurrency(remainingBudget)}
          </p>
        </div>
      </div>
    </section>
  );
}
