import { useTransactions } from "../../api/queries";

interface TransactionsSectionProps {
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  sortBy: string;
  page: number;
  onPageChange: (page: number) => void;
}

export default function TransactionsSection({
  category,
  startDate,
  endDate,
  sortBy,
  page,
  onPageChange,
}: TransactionsSectionProps) {
  const { data, isLoading, error } = useTransactions({
    category,
    startDate,
    endDate,
    sortBy,
    page,
  });

  if (isLoading)
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />;
  if (error)
    return <div className="text-red-500">Failed to load transactions</div>;
  if (!data) return null;

  const { transactions, pagination } = data;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.map((txn) => (
          <div key={txn.id} className="flex items-center gap-3 py-2 border-b">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: txn.categoryColor }}
            />
            <div className="flex-1">
              <p className="font-medium">{txn.merchant}</p>
              <p className="text-sm text-gray-500">{txn.description}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">R{txn.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                {new Date(txn.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <span className="text-sm text-gray-500">
          Showing {pagination.offset + 1}-
          {pagination.offset + transactions.length} of {pagination.total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!pagination.hasMore}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
