import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export interface DashboardParams {
  period: string;
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  sortBy: string | null;
  page: number;
  months: number;
}

const DEFAULTS: DashboardParams = {
  period: "30d",
  category: null,
  startDate: null,
  endDate: null,
  sortBy: "date_desc",
  page: 1,
  months: 12,
};

export function useDashboardParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: DashboardParams = useMemo(() => {
    return {
      period: searchParams.get("period") || DEFAULTS.period,
      category: searchParams.get("category") || DEFAULTS.category,
      startDate: searchParams.get("startDate") || DEFAULTS.startDate,
      endDate: searchParams.get("endDate") || DEFAULTS.endDate,
      sortBy: searchParams.get("sortBy") || DEFAULTS.sortBy,
      page: parseInt(searchParams.get("page") || DEFAULTS.page.toString()),
      months: parseInt(
        searchParams.get("months") || DEFAULTS.months.toString(),
      ),
    };
  }, [searchParams]);

  const setParams = useCallback(
    (updates: Partial<DashboardParams>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (
            value === null ||
            value === undefined ||
            value === DEFAULTS[key as keyof DashboardParams]
          ) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });

        return next;
      });
    },
    [setSearchParams],
  );

  const resetParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return { params, setParams, resetParams };
}
