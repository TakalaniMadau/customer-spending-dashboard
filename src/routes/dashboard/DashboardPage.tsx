import { useDashboardParams } from "./useDashboardParams";
import { useFilters } from "../../api/queries";
import SummarySection from "./SummarySection";
import CategoriesSection from "./CategoriesSection";
import TransactionsSection from "./TransactionsSection";
import GoalsSection from "./GoalsSection";
import TrendsSection from "./TrendsSection";

export default function DashboardPage() {
  const { params, setParams } = useDashboardParams();
  const { data: filters } = useFilters();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters?.dateRangePresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setParams({ period: preset.value })}
            className={`px-4 py-2 rounded ${
              params.period === preset.value
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setParams({ category: null })}
          className={`px-3 py-1 rounded text-sm ${
            !params.category ? "bg-gray-800 text-white" : "bg-white border"
          }`}
        >
          All Categories
        </button>
        {filters?.categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setParams({ category: cat.name })}
            className={`px-3 py-1 rounded text-sm ${
              params.category === cat.name ? "text-white" : "bg-white border"
            }`}
            style={{
              backgroundColor:
                params.category === cat.name ? cat.color : undefined,
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Summary */}
      <SummarySection period={params.period} />

      {/* Trends */}
      <TrendsSection
        months={params.months}
        onMonthsChange={(months) => setParams({ months })}
      />

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <CategoriesSection
          period={params.period}
          startDate={params.startDate}
          endDate={params.endDate}
        />
        <GoalsSection />
      </div>

      {/* Transactions */}
      <TransactionsSection
        category={params.category}
        startDate={params.startDate}
        endDate={params.endDate}
        sortBy={params.sortBy || "date_desc"}
        page={params.page}
        onPageChange={(page) => setParams({ page })}
      />
    </div>
  );
}
