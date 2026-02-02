import { useSpendingByCategory } from "../../api/queries";

interface CategoriesSectionProps {
  period: string;
  startDate: string | null;
  endDate: string | null;
}

export default function CategoriesSection({
  period,
  startDate,
  endDate,
}: CategoriesSectionProps) {
  const { data, isLoading, error } = useSpendingByCategory({
    period,
    startDate,
    endDate,
  });

  if (isLoading)
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />;
  if (error)
    return <div className="text-red-500">Failed to load categories</div>;
  if (!data) return null;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
      <div className="space-y-3">
        {data.categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="flex-1">{cat.name}</span>
            <span className="text-gray-500">{cat.transactionCount} txns</span>
            <span className="font-medium w-24 text-right">
              R{cat.amount.toLocaleString()}
            </span>
            <span className="text-gray-400 w-12 text-right">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
