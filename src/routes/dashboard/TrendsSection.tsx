import { useSpendingTrends } from "../../api/queries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendsSectionProps {
  months: number;
  onMonthsChange: (months: number) => void;
}

export default function TrendsSection({
  months,
  onMonthsChange,
}: TrendsSectionProps) {
  const { data, isLoading, error } = useSpendingTrends(months);

  if (isLoading)
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">Failed to load trends</div>;
  if (!data) return null;

  const chartData = data.trends.map((trend) => ({
    ...trend,
    label: new Date(trend.month + "-01").toLocaleDateString("en-ZA", {
      month: "short",
      year: "2-digit",
    }),
  }));

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Spending Trends</h2>
        <div className="flex gap-1">
          <button
            onClick={() => onMonthsChange(12)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              months === 12
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            12 Months
          </button>
          <button
            onClick={() => onMonthsChange(24)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              months === 24
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            24 Months
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              formatter={(value) => [
                `R${(value as number).toLocaleString()}`,
                "Spent",
              ]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="totalSpent"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ fill: "#DC2626", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
