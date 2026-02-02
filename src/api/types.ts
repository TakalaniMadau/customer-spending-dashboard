export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: string;
  totalSpent: number;
  currency: string;
}

export interface SpendingSummary {
  period: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;
    transactionChange: number;
  };
}

export interface Category {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
}

export interface SpendingByCategory {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: Category[];
}

export interface TrendMonth {
  month: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface SpendingTrends {
  trends: TrendMonth[];
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  icon: string;
  categoryColor: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface Goal {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: "on_track" | "warning" | "exceeded";
}

export interface GoalsResponse {
  goals: Goal[];
}

export interface CategoryFilter {
  name: string;
  color: string;
  icon: string;
}

export interface DateRangePreset {
  label: string;
  value: string;
}

export interface FilterResponse {
  categories: CategoryFilter[];
  dateRangePresets: DateRangePreset[];
}
