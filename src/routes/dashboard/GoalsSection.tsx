import { useGoals } from "../../api/queries";

export default function GoalsSection() {
  const { data, isLoading, error } = useGoals();

  if (isLoading)
    return <div className="animate-pulse h-32 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">Failed to load goals</div>;
  if (!data) return null;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Budget Goals</h2>
      <div className="space-y-4">
        {data.goals.map((goal) => (
          <div key={goal.id}>
            <div className="flex justify-between mb-1">
              <span>{goal.category}</span>
              <span className="text-sm text-gray-500">
                R{goal.currentSpent.toLocaleString()} / R
                {goal.monthlyBudget.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  goal.status === "warning"
                    ? "bg-yellow-500"
                    : goal.status === "exceeded"
                      ? "bg-red-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(goal.percentageUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {goal.daysRemaining} days remaining
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
