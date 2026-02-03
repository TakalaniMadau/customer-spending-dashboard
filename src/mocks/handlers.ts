import { http, HttpResponse } from "msw";
import type {
  CustomerProfile,
  SpendingSummary,
  SpendingByCategory,
  SpendingTrends,
  TransactionsResponse,
  GoalsResponse,
  FilterResponse,
} from "../api/types";

const CUSTOMER_ID = "12345";

export const handlers = [
  http.get("/api/customers/:customerId/profile", () => {
    const data: CustomerProfile = {
      customerId: CUSTOMER_ID,
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "2023-01-15",
      accountType: "premium",
      totalSpent: 15420.5,
      currency: "ZAR",
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/spending/summary", ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get("period") || "30d";

    const periodData: Record<string, SpendingSummary> = {
      "7d": {
        period: "7d",
        totalSpent: 892.45,
        transactionCount: 12,
        averageTransaction: 74.37,
        topCategory: "Dining",
        comparedToPrevious: {
          spentChange: -5.2,
          transactionChange: 8.3,
        },
      },
      "30d": {
        period: "30d",
        totalSpent: 4250.75,
        transactionCount: 47,
        averageTransaction: 90.44,
        topCategory: "Groceries",
        comparedToPrevious: {
          spentChange: 12.5,
          transactionChange: -3.2,
        },
      },
      "90d": {
        period: "90d",
        totalSpent: 12680.3,
        transactionCount: 142,
        averageTransaction: 89.3,
        topCategory: "Groceries",
        comparedToPrevious: {
          spentChange: 8.7,
          transactionChange: 4.1,
        },
      },
      "1y": {
        period: "1y",
        totalSpent: 48920.6,
        transactionCount: 547,
        averageTransaction: 89.43,
        topCategory: "Groceries",
        comparedToPrevious: {
          spentChange: 15.3,
          transactionChange: 12.8,
        },
      },
    };

    const data = periodData[period] || periodData["30d"];
    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/spending/categories", ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // Base category data with transaction dates for filtering
    const categoryTransactions = [
      {
        category: "Groceries",
        amount: 245.8,
        date: "2024-09-16",
        color: "#FF6B6B",
        icon: "shopping-cart",
      },
      {
        category: "Groceries",
        amount: 189.5,
        date: "2024-09-10",
        color: "#FF6B6B",
        icon: "shopping-cart",
      },
      {
        category: "Entertainment",
        amount: 199.0,
        date: "2024-09-15",
        color: "#4ECDC4",
        icon: "film",
      },
      {
        category: "Entertainment",
        amount: 79.99,
        date: "2024-09-09",
        color: "#4ECDC4",
        icon: "film",
      },
      {
        category: "Transportation",
        amount: 85.5,
        date: "2024-09-14",
        color: "#45B7D1",
        icon: "car",
      },
      {
        category: "Transportation",
        amount: 650.0,
        date: "2024-09-08",
        color: "#45B7D1",
        icon: "car",
      },
      {
        category: "Transportation",
        amount: 120.0,
        date: "2024-09-02",
        color: "#45B7D1",
        icon: "car",
      },
      {
        category: "Dining",
        amount: 320.0,
        date: "2024-09-13",
        color: "#F7DC6F",
        icon: "utensils",
      },
      {
        category: "Dining",
        amount: 285.0,
        date: "2024-09-07",
        color: "#F7DC6F",
        icon: "utensils",
      },
      {
        category: "Dining",
        amount: 156.0,
        date: "2024-09-03",
        color: "#F7DC6F",
        icon: "utensils",
      },
      {
        category: "Shopping",
        amount: 450.8,
        date: "2024-09-12",
        color: "#BB8FCE",
        icon: "shopping-bag",
      },
      {
        category: "Shopping",
        amount: 899.0,
        date: "2024-09-06",
        color: "#BB8FCE",
        icon: "shopping-bag",
      },
      {
        category: "Shopping",
        amount: 342.5,
        date: "2024-09-04",
        color: "#BB8FCE",
        icon: "shopping-bag",
      },
      {
        category: "Utilities",
        amount: 1250.0,
        date: "2024-09-11",
        color: "#85C1E9",
        icon: "zap",
      },
      {
        category: "Utilities",
        amount: 599.0,
        date: "2024-09-05",
        color: "#85C1E9",
        icon: "zap",
      },
    ];

    // Filter by date range
    let filtered = categoryTransactions;
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((t) => new Date(t.date) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => new Date(t.date) <= end);
    }

    // Aggregate by category
    const categoryMap = new Map<
      string,
      { amount: number; count: number; color: string; icon: string }
    >();
    filtered.forEach((t) => {
      const existing = categoryMap.get(t.category) || {
        amount: 0,
        count: 0,
        color: t.color,
        icon: t.icon,
      };
      existing.amount += t.amount;
      existing.count += 1;
      categoryMap.set(t.category, existing);
    });

    const totalAmount = filtered.reduce((sum, t) => sum + t.amount, 0);

    const categories = Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name,
        amount: Math.round(data.amount * 100) / 100,
        percentage:
          totalAmount > 0
            ? Math.round((data.amount / totalAmount) * 1000) / 10
            : 0,
        transactionCount: data.count,
        color: data.color,
        icon: data.icon,
      }))
      .sort((a, b) => b.amount - a.amount);

    const data: SpendingByCategory = {
      dateRange: {
        startDate: startDate || "2024-08-16",
        endDate: endDate || "2024-09-16",
      },
      totalAmount: Math.round(totalAmount * 100) / 100,
      categories,
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/spending/trends", ({ request }) => {
    const url = new URL(request.url);
    const requestedMonths = Number(url.searchParams.get("months")) || 12;
    const months = Math.min(Math.max(requestedMonths, 1), 24); // Clamp between 1-24

    // Generate dynamic trend data for the requested number of months
    const allTrends = [
      {
        month: "2023-01",
        totalSpent: 3650.2,
        transactionCount: 40,
        averageTransaction: 91.26,
      },
      {
        month: "2023-02",
        totalSpent: 3420.15,
        transactionCount: 36,
        averageTransaction: 95.0,
      },
      {
        month: "2023-03",
        totalSpent: 3890.8,
        transactionCount: 43,
        averageTransaction: 90.48,
      },
      {
        month: "2023-04",
        totalSpent: 4010.25,
        transactionCount: 41,
        averageTransaction: 97.81,
      },
      {
        month: "2023-05",
        totalSpent: 3780.6,
        transactionCount: 39,
        averageTransaction: 96.94,
      },
      {
        month: "2023-06",
        totalSpent: 4120.45,
        transactionCount: 44,
        averageTransaction: 93.65,
      },
      {
        month: "2023-07",
        totalSpent: 3950.3,
        transactionCount: 42,
        averageTransaction: 94.05,
      },
      {
        month: "2023-08",
        totalSpent: 4280.75,
        transactionCount: 46,
        averageTransaction: 93.06,
      },
      {
        month: "2023-09",
        totalSpent: 3720.4,
        transactionCount: 38,
        averageTransaction: 97.91,
      },
      {
        month: "2023-10",
        totalSpent: 4050.9,
        transactionCount: 43,
        averageTransaction: 94.21,
      },
      {
        month: "2023-11",
        totalSpent: 4350.25,
        transactionCount: 48,
        averageTransaction: 90.63,
      },
      {
        month: "2023-12",
        totalSpent: 5120.8,
        transactionCount: 55,
        averageTransaction: 93.11,
      },
      {
        month: "2024-01",
        totalSpent: 3890.25,
        transactionCount: 42,
        averageTransaction: 92.62,
      },
      {
        month: "2024-02",
        totalSpent: 4150.8,
        transactionCount: 38,
        averageTransaction: 109.23,
      },
      {
        month: "2024-03",
        totalSpent: 3750.6,
        transactionCount: 45,
        averageTransaction: 83.35,
      },
      {
        month: "2024-04",
        totalSpent: 4200.45,
        transactionCount: 39,
        averageTransaction: 107.7,
      },
      {
        month: "2024-05",
        totalSpent: 3980.3,
        transactionCount: 44,
        averageTransaction: 90.46,
      },
      {
        month: "2024-06",
        totalSpent: 4250.75,
        transactionCount: 47,
        averageTransaction: 90.44,
      },
      {
        month: "2024-07",
        totalSpent: 4100.2,
        transactionCount: 45,
        averageTransaction: 91.12,
      },
      {
        month: "2024-08",
        totalSpent: 4320.55,
        transactionCount: 48,
        averageTransaction: 90.01,
      },
      {
        month: "2024-09",
        totalSpent: 3890.4,
        transactionCount: 42,
        averageTransaction: 92.63,
      },
      {
        month: "2024-10",
        totalSpent: 4180.65,
        transactionCount: 46,
        averageTransaction: 90.88,
      },
      {
        month: "2024-11",
        totalSpent: 4450.3,
        transactionCount: 49,
        averageTransaction: 90.82,
      },
      {
        month: "2024-12",
        totalSpent: 5280.9,
        transactionCount: 58,
        averageTransaction: 91.05,
      },
    ];

    // Return the last N months of data
    const data: SpendingTrends = {
      trends: allTrends.slice(-months),
    };

    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/transactions", ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 5;
    const offset = Number(url.searchParams.get("offset")) || 0;
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const allTransactions = [
      {
        id: "txn_001",
        date: "2024-09-16T14:30:00Z",
        merchant: "Pick n Pay",
        category: "Groceries",
        amount: 245.8,
        description: "Weekly groceries",
        paymentMethod: "Credit Card",
        icon: "shopping-cart",
        categoryColor: "#FF6B6B",
      },
      {
        id: "txn_002",
        date: "2024-09-15T10:15:00Z",
        merchant: "Netflix",
        category: "Entertainment",
        amount: 199.0,
        description: "Monthly subscription",
        paymentMethod: "Debit Order",
        icon: "film",
        categoryColor: "#4ECDC4",
      },
      {
        id: "txn_003",
        date: "2024-09-14T18:45:00Z",
        merchant: "Uber",
        category: "Transportation",
        amount: 85.5,
        description: "Ride to office",
        paymentMethod: "Credit Card",
        icon: "car",
        categoryColor: "#45B7D1",
      },
      {
        id: "txn_004",
        date: "2024-09-13T12:30:00Z",
        merchant: "Nando's",
        category: "Dining",
        amount: 320.0,
        description: "Lunch with team",
        paymentMethod: "Credit Card",
        icon: "utensils",
        categoryColor: "#F7DC6F",
      },
      {
        id: "txn_005",
        date: "2024-09-12T16:20:00Z",
        merchant: "Woolworths",
        category: "Shopping",
        amount: 450.8,
        description: "Clothing purchase",
        paymentMethod: "Credit Card",
        icon: "shopping-bag",
        categoryColor: "#BB8FCE",
      },
      {
        id: "txn_006",
        date: "2024-09-11T09:00:00Z",
        merchant: "City Power",
        category: "Utilities",
        amount: 1250.0,
        description: "Electricity bill",
        paymentMethod: "Debit Order",
        icon: "zap",
        categoryColor: "#85C1E9",
      },
      {
        id: "txn_007",
        date: "2024-09-10T15:45:00Z",
        merchant: "Checkers",
        category: "Groceries",
        amount: 189.5,
        description: "Household items",
        paymentMethod: "Credit Card",
        icon: "shopping-cart",
        categoryColor: "#FF6B6B",
      },
      {
        id: "txn_008",
        date: "2024-09-09T20:00:00Z",
        merchant: "Spotify",
        category: "Entertainment",
        amount: 79.99,
        description: "Music subscription",
        paymentMethod: "Debit Order",
        icon: "film",
        categoryColor: "#4ECDC4",
      },
      {
        id: "txn_009",
        date: "2024-09-08T11:30:00Z",
        merchant: "Shell",
        category: "Transportation",
        amount: 650.0,
        description: "Fuel",
        paymentMethod: "Credit Card",
        icon: "car",
        categoryColor: "#45B7D1",
      },
      {
        id: "txn_010",
        date: "2024-09-07T19:15:00Z",
        merchant: "Spur",
        category: "Dining",
        amount: 285.0,
        description: "Family dinner",
        paymentMethod: "Credit Card",
        icon: "utensils",
        categoryColor: "#F7DC6F",
      },
      {
        id: "txn_011",
        date: "2024-09-06T14:00:00Z",
        merchant: "Takealot",
        category: "Shopping",
        amount: 899.0,
        description: "Electronics",
        paymentMethod: "Credit Card",
        icon: "shopping-bag",
        categoryColor: "#BB8FCE",
      },
      {
        id: "txn_012",
        date: "2024-09-05T08:30:00Z",
        merchant: "Vodacom",
        category: "Utilities",
        amount: 599.0,
        description: "Mobile contract",
        paymentMethod: "Debit Order",
        icon: "zap",
        categoryColor: "#85C1E9",
      },
      {
        id: "txn_013",
        date: "2024-09-04T17:00:00Z",
        merchant: "Dis-Chem",
        category: "Shopping",
        amount: 342.5,
        description: "Pharmacy",
        paymentMethod: "Credit Card",
        icon: "shopping-bag",
        categoryColor: "#BB8FCE",
      },
      {
        id: "txn_014",
        date: "2024-09-03T13:45:00Z",
        merchant: "Mugg & Bean",
        category: "Dining",
        amount: 156.0,
        description: "Coffee meeting",
        paymentMethod: "Credit Card",
        icon: "utensils",
        categoryColor: "#F7DC6F",
      },
      {
        id: "txn_015",
        date: "2024-09-02T10:00:00Z",
        merchant: "Gautrain",
        category: "Transportation",
        amount: 120.0,
        description: "Train ticket",
        paymentMethod: "Credit Card",
        icon: "car",
        categoryColor: "#45B7D1",
      },
    ];

    let filteredTransactions = allTransactions;
    if (startDate) {
      const start = new Date(startDate);
      filteredTransactions = filteredTransactions.filter(
        (txn) => new Date(txn.date) >= start,
      );
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include entire end day
      filteredTransactions = filteredTransactions.filter(
        (txn) => new Date(txn.date) <= end,
      );
    }

    const paginatedTransactions = filteredTransactions.slice(
      offset,
      offset + limit,
    );
    const total = filteredTransactions.length;

    const data: TransactionsResponse = {
      transactions: paginatedTransactions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/goals", () => {
    const data: GoalsResponse = {
      goals: [
        {
          id: "goal_001",
          category: "Entertainment",
          monthlyBudget: 1000.0,
          currentSpent: 650.3,
          percentageUsed: 65.03,
          daysRemaining: 12,
          status: "on_track",
        },
        {
          id: "goal_002",
          category: "Groceries",
          monthlyBudget: 1500.0,
          currentSpent: 1450.8,
          percentageUsed: 96.72,
          daysRemaining: 12,
          status: "warning",
        },
        {
          id: "goal_003",
          category: "Dining",
          monthlyBudget: 800.0,
          currentSpent: 520.0,
          percentageUsed: 65.0,
          daysRemaining: 12,
          status: "on_track",
        },
      ],
    };
    return HttpResponse.json(data);
  }),

  http.get("/api/customers/:customerId/filters", () => {
    const data: FilterResponse = {
      categories: [
        {
          name: "Groceries",
          color: "#FF6B6B",
          icon: "shopping-cart",
        },
        {
          name: "Entertainment",
          color: "#4ECDC4",
          icon: "film",
        },
        {
          name: "Transportation",
          color: "#45B7D1",
          icon: "car",
        },
        {
          name: "Dining",
          color: "#F7DC6F",
          icon: "utensils",
        },
        {
          name: "Shopping",
          color: "#BB8FCE",
          icon: "shopping-bag",
        },
        {
          name: "Utilities",
          color: "#85C1E9",
          icon: "zap",
        },
      ],
      dateRangePresets: [
        {
          label: "Last 7 days",
          value: "7d",
        },
        {
          label: "Last 30 days",
          value: "30d",
        },
        {
          label: "Last 90 days",
          value: "90d",
        },
        {
          label: "Last year",
          value: "1y",
        },
      ],
    };
    return HttpResponse.json(data);
  }),
];
