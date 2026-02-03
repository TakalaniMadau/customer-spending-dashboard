import { useTransactions } from "../../api/queries";
import {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
  ChevronLeft,
  ChevronRight,
  SearchX,
  type LucideIcon,
} from "lucide-react";

interface TransactionsSectionProps {
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  sortBy: string;
  page: number;
  onPageChange: (page: number) => void;
}

const iconMap: Record<string, LucideIcon> = {
  "shopping-cart": ShoppingCart,
  film: Film,
  car: Car,
  utensils: Utensils,
  "shopping-bag": ShoppingBag,
  zap: Zap,
};

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
  const totalPages = Math.ceil(pagination.total / 5);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-sm text-gray-500">Your latest spending activity</p>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
        <span>Date</span>
        <span>Merchant</span>
        <span>Category</span>
        <span>Description</span>
        <span>Payment</span>
        <span className="text-right">Amount</span>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <SearchX className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No transactions found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            No transactions match your current filters. Try adjusting the date
            range or category.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {transactions.map((txn) => {
            const Icon = iconMap[txn.icon] || ShoppingCart;
            const date = new Date(txn.date);

            return (
              <div
                key={txn.id}
                className="py-4 px-4 hover:bg-gray-50 transition-colors"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      {date.toLocaleDateString("en-ZA", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {date.toLocaleTimeString("en-ZA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${txn.categoryColor}20` }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: txn.categoryColor }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">
                      {txn.merchant}
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: txn.categoryColor }}
                  >
                    {txn.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    {txn.description}
                  </span>
                  <span className="text-sm text-gray-600">
                    {txn.paymentMethod}
                  </span>
                  <span className="text-right font-semibold text-gray-900">
                    R {txn.amount.toLocaleString()}
                  </span>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${txn.categoryColor}20` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: txn.categoryColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-900">
                        {txn.merchant}
                      </p>
                      <p className="font-semibold text-gray-900 shrink-0">
                        R {txn.amount.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {txn.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: txn.categoryColor }}
                      >
                        {txn.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {date.toLocaleDateString("en-ZA", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
        <span className="text-sm text-gray-500">
          Showing {pagination.offset + 1}-
          {pagination.offset + transactions.length} of {pagination.total}{" "}
          transactions
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[gray-50]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === pageNum
                    ? "bg-[#2f70ef] text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ),
          )}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!pagination.hasMore}
            className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
