import { useSpendingSummary } from "../../api/queries";

interface SummarySectionProps {
  period: string;
}

export default function SummarySection({ period }: SummarySectionProps) {
  const { data, isLoading, error } = useSpendingSummary(period);

  if (isLoading)
    return <div className="animate-pulse h-32 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">Failed to load summary</div>;
  if (!data) return null;

  const {
    totalSpent,
    transactionCount,
    averageTransaction,
    topCategory,
    comparedToPrevious,
  } = data;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Total Spent</p>
        <p className="text-2xl font-bold">R{totalSpent.toLocaleString()}</p>
        <p
          className={`text-sm ${comparedToPrevious.spentChange >= 0 ? "text-red-500" : "text-green-500"}`}
        >
          {comparedToPrevious.spentChange >= 0 ? "+" : ""}
          {comparedToPrevious.spentChange}% vs previous
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Transactions</p>
        <p className="text-2xl font-bold">{transactionCount}</p>
        <p
          className={`text-sm ${comparedToPrevious.transactionChange >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {comparedToPrevious.transactionChange >= 0 ? "+" : ""}
          {comparedToPrevious.transactionChange}%
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Avg Transaction</p>
        <p className="text-2xl font-bold">R{averageTransaction.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Top Category</p>
        <p className="text-2xl font-bold">{topCategory}</p>
      </div>
    </section>
  );
}
