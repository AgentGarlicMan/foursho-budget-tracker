import { useState } from 'react';
import { AppState, Contribution, Expense, Role } from '../types';
import { BudgetSummary } from './BudgetSummary';
import { ContributionForm } from './ContributionForm';
import { ContributionList } from './ContributionList';
import { ContributionChart } from './ContributionChart';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { ResetData } from './ResetData';
import { ThemeToggle } from './ThemeToggle';

interface DashboardProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  resetState: () => void;
  role: Role;
  memberName: string;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Dashboard({
  state,
  setState,
  resetState,
  role,
  memberName,
  onLogout,
  theme,
  toggleTheme,
}: DashboardProps) {
  const [editingContribution, setEditingContribution] =
    useState<Contribution | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleSaveContribution = (contribution: Contribution) => {
    setState((prev) => {
      const exists = prev.contributions.find((c) => c.id === contribution.id);
      if (exists) {
        return {
          ...prev,
          contributions: prev.contributions.map((c) =>
            c.id === contribution.id ? contribution : c
          ),
        };
      }
      return {
        ...prev,
        contributions: [...prev.contributions, contribution],
      };
    });
    setEditingContribution(null);
  };

  const handleDeleteContribution = (id: string) => {
    setState((prev) => ({
      ...prev,
      contributions: prev.contributions.filter((c) => c.id !== id),
    }));
  };

  const handleSaveExpense = (expense: Expense) => {
    setState((prev) => {
      const exists = prev.expenses.find((e) => e.id === expense.id);
      if (exists) {
        return {
          ...prev,
          expenses: prev.expenses.map((e) =>
            e.id === expense.id ? expense : e
          ),
        };
      }
      return {
        ...prev,
        expenses: [...prev.expenses, expense],
      };
    });
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Capstone Group Budget Tracker
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Logged in as{' '}
              <span className="font-semibold">{memberName}</span>
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                {role === 'leader' ? 'Leader' : 'Viewer'}
              </span>
            </p>
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Switch User
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section aria-label="Budget overview" className="lg:col-span-2">
            <BudgetSummary
              contributions={state.contributions}
              expenses={state.expenses}
            />
          </section>

          <section aria-label="Contributions chart" className="lg:col-span-2">
            <ContributionChart contributions={state.contributions} theme={theme} />
          </section>

          <section aria-label="Contributions section" className="flex flex-col gap-6">
            {role === 'leader' && (
              <ContributionForm
                onSave={handleSaveContribution}
                editingContribution={editingContribution}
                onCancelEdit={() => setEditingContribution(null)}
              />
            )}
            <ContributionList
              contributions={state.contributions}
              role={role}
              onEdit={setEditingContribution}
              onDelete={handleDeleteContribution}
            />
          </section>

          <section aria-label="Expenses section" className="flex flex-col gap-6">
            {role === 'leader' && (
              <ExpenseForm
                onSave={handleSaveExpense}
                editingExpense={editingExpense}
                onCancelEdit={() => setEditingExpense(null)}
              />
            )}
            <ExpenseList
              expenses={state.expenses}
              role={role}
              onEdit={setEditingExpense}
              onDelete={handleDeleteExpense}
            />
          </section>

          {role === 'leader' && (
            <section aria-label="Data management" className="lg:col-span-2">
              <ResetData onReset={resetState} />
            </section>
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Capstone Group Budget Tracker - Built with React, TypeScript, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
