import { useSpendingTrends } from "../../api/queries";

export default function TrendsSection() {
  const { data, isLoading, error } = useSpendingTrends(6);

  if (isLoading)
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">Failed to load trends</div>;
  if (!data) return null;

  const maxSpent = Math.max(...data.trends.map((t) => t.totalSpent));

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Spending Trends</h2>
      <div className="flex items-end gap-2 h-48">
        {data.trends.map((trend) => {
          const height = (trend.totalSpent / maxSpent) * 100;
          const month = new Date(trend.month + "-01").toLocaleDateString(
            "en-ZA",
            {
              month: "short",
            },
          );

          return (
            <div
              key={trend.month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-xs text-gray-500">
                R{(trend.totalSpent / 1000).toFixed(1)}k
              </span>
              <div
                className="w-full bg-blue-500 rounded-t transition-all"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-600">{month}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
