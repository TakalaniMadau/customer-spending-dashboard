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
        <select
          value={months}
          onChange={(e) => onMonthsChange(Number(e.target.value))}
          className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00466E] focus:border-[#00466E] cursor-pointer"
        >
          <option value={12}>Last 12 Months</option>
          <option value={24}>Last 24 Months</option>
        </select>
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
