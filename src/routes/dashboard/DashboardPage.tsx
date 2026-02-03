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
    <div className="p-6 space-y-6 min-h-screen">
      {/* Combined Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 relative z-10">
        <select
          id="period-select"
          value={params.period}
          onChange={(e) => {
            setParams({
              period: e.target.value,
              startDate: null,
              endDate: null,
            });
          }}
          className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2f70ef] focus:border-[#2f70ef] cursor-pointer"
        >
          {filters?.dateRangePresets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
          <option value="custom">Custom Range</option>
        </select>

        {params.period === "custom" && (
          <>
            <div className="flex items-center gap-2">
              <label htmlFor="start-date" className="text-sm text-gray-600">
                From
              </label>
              <input
                type="date"
                id="start-date"
                value={params.startDate || ""}
                onChange={(e) =>
                  setParams({ startDate: e.target.value || null })
                }
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2f70ef] focus:border-[#2f70ef]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="end-date" className="text-sm text-gray-600">
                To
              </label>
              <input
                type="date"
                id="end-date"
                value={params.endDate || ""}
                onChange={(e) => setParams({ endDate: e.target.value || null })}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2f70ef] focus:border-[#2f70ef]"
              />
            </div>
          </>
        )}

        <select
          id="category-select"
          value={params.category || ""}
          onChange={(e) => setParams({ category: e.target.value || null })}
          className="px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2f70ef] focus:border-[#2f70ef] cursor-pointer"
        >
          <option value="">All Categories</option>
          {filters?.categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {(params.category ||
          params.period !== "30d" ||
          params.startDate ||
          params.endDate) && (
          <button
            onClick={() =>
              setParams({
                period: "30d",
                category: null,
                startDate: null,
                endDate: null,
              })
            }
            className="px-3 py-1.5 text-sm font-medium text-white bg-[#2f70ef] border border-[#2f70ef] rounded-lg hover:bg-[#2559c7]"
          >
            Reset
          </button>
        )}
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
