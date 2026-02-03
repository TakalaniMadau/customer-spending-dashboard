import { useSpendingByCategory } from "../../api/queries";
import {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
  SearchX,
  type LucideIcon,
} from "lucide-react";

interface CategoriesSectionProps {
  period: string;
  startDate: string | null;
  endDate: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  "shopping-cart": ShoppingCart,
  film: Film,
  car: Car,
  utensils: Utensils,
  "shopping-bag": ShoppingBag,
  zap: Zap,
};

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
      <h2 className="text-lg font-semibold mb-6">Spending by Category</h2>
      {data.categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <SearchX className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No spending data
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            No spending data found for the selected date range. Try adjusting
            your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.categories.map((cat) => {
            const Icon = iconMap[cat.icon] || ShoppingCart;
            return (
              <div key={cat.name}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <Icon
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: cat.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-gray-900 truncate">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          R{cat.amount.toLocaleString()}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400">
                          {cat.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-12 sm:ml-14 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
