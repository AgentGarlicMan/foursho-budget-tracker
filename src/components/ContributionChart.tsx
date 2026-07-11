import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Contribution } from '../types';
import { MEMBERS } from '../constants';
import { formatCurrency } from '../utils/formatCurrency';

interface ContributionChartProps {
  contributions: Contribution[];
  theme?: 'light' | 'dark';
}

export function ContributionChart({ contributions, theme = 'light' }: ContributionChartProps) {
  const isDark = theme === 'dark';

  const chartData = MEMBERS.map((member) => {
    const total = contributions
      .filter((c) => c.memberName === member)
      .reduce((sum, c) => sum + c.amount, 0);
    return { name: member, total };
  });

  const recentContributions = MEMBERS.map((member) => {
    const memberContribs = contributions
      .filter((c) => c.memberName === member)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
      name: member,
      latest: memberContribs[0] || null,
    };
  });

  const gridStroke = isDark ? '#374151' : '#e5e7eb';
  const tickFill = isDark ? '#d1d5db' : '#4b5563';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#e5e7eb';
  const tooltipText = isDark ? '#f3f4f6' : '#111827';

  return (
    <section aria-label="Contribution Chart" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
        Contributions by Member
      </h2>
      <div className="w-full h-48 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: tickFill }} />
            <YAxis tick={{ fontSize: 12, fill: tickFill }} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Total']}
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                borderRadius: '0.5rem',
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
            />
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {recentContributions.map(({ name, latest }) => (
          <div
            key={name}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3 text-center"
          >
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{name}</p>
            {latest ? (
              <>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(latest.amount)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{latest.date}</p>
              </>
            ) : (
              <p className="text-xs text-gray-400 dark:text-gray-500">No contributions</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
