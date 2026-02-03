import { useGoals } from "../../api/queries";
import {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Groceries: ShoppingCart,
  Entertainment: Film,
  Transportation: Car,
  Dining: Utensils,
  Shopping: ShoppingBag,
  Utilities: Zap,
};

const categoryColors: Record<string, string> = {
  Groceries: "#FF6B6B",
  Entertainment: "#4ECDC4",
  Transportation: "#45B7D1",
  Dining: "#F7DC6F",
  Shopping: "#BB8FCE",
  Utilities: "#85C1E9",
};

const statusConfig = {
  on_track: {
    label: "On Track",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    barColor: "bg-emerald-500",
    cardBg: "bg-emerald-50/50",
  },
  warning: {
    label: "Warning",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
    barColor: "bg-red-400",
    cardBg: "bg-red-50/50",
  },
  exceeded: {
    label: "Exceeded",
    textColor: "text-red-600",
    bgColor: "bg-red-100",
    barColor: "bg-red-600",
    cardBg: "bg-red-50/50",
  },
};

export default function GoalsSection() {
  const { data, isLoading, error } = useGoals();

  if (isLoading)
    return <div className="animate-pulse h-32 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">Failed to load goals</div>;
  if (!data) return null;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-6">Budget Goals</h2>
      <div className="space-y-4">
        {data.goals.map((goal) => {
          const Icon = iconMap[goal.category] || ShoppingCart;
          const color = categoryColors[goal.category] || "#6B7280";
          const status = statusConfig[goal.status];

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-xl ${status.cardBg} border border-gray-100`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{goal.category}</p>
                    <p className="text-xs text-gray-500">
                      {goal.daysRemaining} days remaining
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${status.textColor}`}>
                  {status.label}
                </span>
              </div>

              <div className="flex justify-between items-baseline mb-2">
                <span className={`text-lg font-bold ${status.textColor}`}>
                  R {goal.currentSpent.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  R {goal.monthlyBudget.toLocaleString()}
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${status.barColor}`}
                  style={{ width: `${Math.min(goal.percentageUsed, 100)}%` }}
                />
              </div>

              <p className="text-xs text-gray-500">
                {Math.round(goal.percentageUsed)}% of budget used
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
