import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import type {
  CustomerProfile,
  SpendingSummary,
  SpendingByCategory,
  SpendingTrends,
  TransactionsResponse,
  GoalsResponse,
  FilterResponse,
} from "./types";

const CUSTOMER_ID = "12345";

export function useCustomerProfile() {
  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "profile"],
    queryFn: () =>
      fetcher<CustomerProfile>(`/customers/${CUSTOMER_ID}/profile`),
  });
}

export function useSpendingSummary(period: string) {
  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "spending", "summary", period],
    queryFn: () =>
      fetcher<SpendingSummary>(
        `/customers/${CUSTOMER_ID}/spending/summary?period=${period}`,
      ),
  });
}

export function useSpendingTrends(months: number = 12) {
  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "spending", "trends", months],
    queryFn: () =>
      fetcher<SpendingTrends>(
        `/customers/${CUSTOMER_ID}/spending/trends?months=${months}`,
      ),
  });
}

export function useSpendingByCategory(params: {
  period: string;
  startDate?: string | null;
  endDate?: string | null;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("period", params.period);
  if (params.startDate) searchParams.set("startDate", params.startDate);
  if (params.endDate) searchParams.set("endDate", params.endDate);

  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "spending", "categories", params],
    queryFn: () =>
      fetcher<SpendingByCategory>(
        `/customers/${CUSTOMER_ID}/spending/categories?${searchParams}`,
      ),
  });
}

export function useTransactions(params: {
  category?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  sortBy: string;
  page: number;
  limit?: number;
}) {
  const limit = params.limit || 20;
  const offset = (params.page - 1) * limit;

  const searchParams = new URLSearchParams();
  searchParams.set("limit", String(limit));
  searchParams.set("offset", String(offset));
  searchParams.set("sortBy", params.sortBy);
  if (params.category) searchParams.set("category", params.category);
  if (params.startDate) searchParams.set("startDate", params.startDate);
  if (params.endDate) searchParams.set("endDate", params.endDate);

  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "transactions", params],
    queryFn: () =>
      fetcher<TransactionsResponse>(
        `/customers/${CUSTOMER_ID}/transactions?${searchParams}`,
      ),
  });
}

export function useGoals() {
  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "goals"],
    queryFn: () => fetcher<GoalsResponse>(`/customers/${CUSTOMER_ID}/goals`),
  });
}

export function useFilters() {
  return useQuery({
    queryKey: ["customer", CUSTOMER_ID, "filters"],
    queryFn: () => fetcher<FilterResponse>(`/customers/${CUSTOMER_ID}/filters`),
  });
}
