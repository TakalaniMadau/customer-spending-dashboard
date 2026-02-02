import { useDashboardParams } from "./useDashboardParams";

export default function DashboardPage() {
  const { params, setParams } = useDashboardParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Debug: Show current URL params */}
      <pre className="bg-gray-100 p-4 rounded text-sm mb-4">
        {JSON.stringify(params, null, 2)}
      </pre>

      {/* Test: Update URL */}
      <div className="flex gap-2">
        <button
          onClick={() => setParams({ period: "7d" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          7 Days
        </button>
        <button
          onClick={() => setParams({ period: "30d" })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          30 Days
        </button>
        <button
          onClick={() => setParams({ category: "Groceries" })}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Groceries
        </button>
      </div>
    </div>
  );
}
