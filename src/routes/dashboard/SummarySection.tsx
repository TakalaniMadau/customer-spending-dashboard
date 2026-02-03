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
      <div className="bg-[#2f70ef] p-4 rounded-lg shadow text-white">
        <p className="text-sm">Total Spent</p>
        <p className="text-2xl font-bold">R{totalSpent.toLocaleString()}</p>
        <p
          className={`text-sm px-2 py-1 rounded mt-2 ${comparedToPrevious.spentChange >= 0 ? "text-red-500 bg-white" : "text-green-500 bg-white"}`}
        >
          {comparedToPrevious.spentChange >= 0 ? "+" : ""}
          {comparedToPrevious.spentChange}% vs previous
        </p>
      </div>
      <div className="bg-[#0033a0] p-4 rounded-lg shadow text-white">
        <p className="text-sm">Transactions</p>
        <p className="text-2xl font-bold">{transactionCount}</p>
        <p
          className={`text-sm px-2 py-1 rounded mt-2 ${comparedToPrevious.transactionChange >= 0 ? "text-green-500 bg-white" : "text-red-500 bg-white"}`}
        >
          {comparedToPrevious.transactionChange >= 0 ? "+" : ""}
          {comparedToPrevious.transactionChange}%
        </p>
      </div>
      <div className="bg-[#5d737e] p-4 rounded-lg shadow text-white">
        <p className="text-sm">Avg Transaction</p>
        <p className="text-2xl font-bold">R{averageTransaction.toFixed(2)}</p>
      </div>
      <div className="bg-[#e61414] p-4 rounded-lg shadow text-white">
        <p className="text-sm">Top Category</p>
        <p className="text-2xl font-bold">{topCategory}</p>
      </div>
    </section>
  );
}
