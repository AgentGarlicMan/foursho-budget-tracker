import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from '../types';
import { MEMBERS } from '../constants';

interface ExpenseFormProps {
  onSave: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

export function ExpenseForm({
  onSave,
  editingExpense,
  onCancelEdit,
}: ExpenseFormProps) {
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [purchasedBy, setPurchasedBy] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setItemName(editingExpense.itemName);
      setCost(editingExpense.cost.toString());
      setDate(editingExpense.date);
      setPurchasedBy(editingExpense.purchasedBy || '');
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !cost || parseFloat(cost) <= 0) return;

    const expense: Expense = {
      id: editingExpense ? editingExpense.id : uuidv4(),
      itemName: itemName.trim(),
      cost: parseFloat(cost),
      date,
      purchasedBy: purchasedBy || undefined,
    };

    onSave(expense);
    resetForm();
  };

  const resetForm = () => {
    setItemName('');
    setCost('');
    setDate(new Date().toISOString().split('T')[0]);
    setPurchasedBy('');
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <fieldset>
        <legend className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
          {editingExpense ? 'Edit Expense' : 'Add Expense'}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div>
            <label
              htmlFor="expense-item"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Item Name
            </label>
            <input
              id="expense-item"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expense-cost"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Cost (&#8369;)
            </label>
            <input
              id="expense-cost"
              type="number"
              min="0.01"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0.00"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expense-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Date
            </label>
            <input
              id="expense-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expense-purchasedBy"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Purchased By (optional)
            </label>
            <select
              id="expense-purchasedBy"
              value={purchasedBy}
              onChange={(e) => setPurchasedBy(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- None --</option>
              {MEMBERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {editingExpense ? 'Update' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Cancel
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}
