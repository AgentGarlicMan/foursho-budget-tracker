import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Contribution } from '../types';
import { MEMBERS } from '../constants';

interface ContributionFormProps {
  onSave: (contribution: Contribution) => void;
  editingContribution: Contribution | null;
  onCancelEdit: () => void;
}

export function ContributionForm({
  onSave,
  editingContribution,
  onCancelEdit,
}: ContributionFormProps) {
  const [memberName, setMemberName] = useState<string>(MEMBERS[0]);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    if (editingContribution) {
      setMemberName(editingContribution.memberName);
      setAmount(editingContribution.amount.toString());
      setDate(editingContribution.date);
    } else {
      resetForm();
    }
  }, [editingContribution]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const contribution: Contribution = {
      id: editingContribution ? editingContribution.id : uuidv4(),
      memberName,
      amount: parseFloat(amount),
      date,
    };

    onSave(contribution);
    resetForm();
  };

  const resetForm = () => {
    setMemberName(MEMBERS[0]);
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <fieldset>
        <legend className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
          {editingContribution ? 'Edit Contribution' : 'Add Contribution'}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label
              htmlFor="contrib-member"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Member
            </label>
            <select
              id="contrib-member"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {MEMBERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="contrib-amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Amount (&#8369;)
            </label>
            <input
              id="contrib-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="contrib-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Date
            </label>
            <input
              id="contrib-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {editingContribution ? 'Update' : 'Add Contribution'}
          </button>
          {editingContribution && (
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
