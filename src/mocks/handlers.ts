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

  http.get("/api/customers/:customerId/spending/categories", () => {
    const data: SpendingByCategory = {
      dateRange: {
        startDate: "2024-08-16",
        endDate: "2024-09-16",
      },
      totalAmount: 4250.75,
      categories: [
        {
          name: "Groceries",
          amount: 1250.3,
          percentage: 29.4,
          transactionCount: 15,
          color: "#FF6B6B",
          icon: "shopping-cart",
        },
        {
          name: "Entertainment",
          amount: 890.2,
          percentage: 20.9,
          transactionCount: 8,
          color: "#4ECDC4",
          icon: "film",
        },
        {
          name: "Transportation",
          amount: 680.45,
          percentage: 16.0,
          transactionCount: 12,
          color: "#45B7D1",
          icon: "car",
        },
        {
          name: "Dining",
          amount: 520.3,
          percentage: 12.2,
          transactionCount: 9,
          color: "#F7DC6F",
          icon: "utensils",
        },
        {
          name: "Shopping",
          amount: 450.8,
          percentage: 10.6,
          transactionCount: 6,
          color: "#BB8FCE",
          icon: "shopping-bag",
        },
        {
          name: "Utilities",
          amount: 458.7,
          percentage: 10.8,
          transactionCount: 3,
          color: "#85C1E9",
          icon: "zap",
        },
      ],
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
    const limit = Number(url.searchParams.get("limit")) || 20;
    const offset = Number(url.searchParams.get("offset")) || 0;

    const data: TransactionsResponse = {
      transactions: [
        {
          id: "txn_123456",
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
          id: "txn_123457",
          date: "2024-09-15T10:15:00Z",
          merchant: "Netflix",
          category: "Entertainment",
          amount: 199.0,
          description: "Monthly subscription",
          paymentMethod: "Debit Order",
          icon: "film",
          categoryColor: "#4ECDC4",
        },
      ],
      pagination: {
        total: 1250,
        limit,
        offset,
        hasMore: true,
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
