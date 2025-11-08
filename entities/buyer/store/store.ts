import { create } from "zustand";
import { getBuyersAction } from "@/app/serverActions/buyer/getBuyersAction";
import { Buyer, BuyerDataStore } from "../types/types";

export const useBuyerDataStore = create<BuyerDataStore>((set, get) => ({
  buyers: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  hasMore: true,
  loading: false,

  setBuyers: (buyers) => set({ buyers }),
  appendBuyers: (buyers) =>
    set((state) => ({ buyers: [...state.buyers, ...buyers] })),
  setFilters: (filters) =>
    set({ filters, pagination: { ...get().pagination, page: 1 } }),
  setSorting: (sorting) =>
    set({ sorting, pagination: { ...get().pagination, page: 1 } }),

  fetchBuyers: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });
    try {
      const data = await getBuyersAction({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
      });
      set({ buyers: data, hasMore: data.length === pagination.limit });
    } finally {
      set({ loading: false });
    }
  },

  fetchMoreBuyers: async () => {
    const state = get();
    if (!state.hasMore || state.loading) return;
    set({ loading: true });
    try {
      const nextPage = state.pagination.page + 1;
      const data = await getBuyersAction({
        ...state.filters,
        page: nextPage,
        limit: state.pagination.limit,
        sortBy: state.sorting.sortBy,
        sortOrder: state.sorting.sortOrder,
      });
      set((s) => ({
        buyers: [...s.buyers, ...data],
        pagination: { ...s.pagination, page: nextPage },
        hasMore: data.length === s.pagination.limit,
      }));
    } finally {
      set({ loading: false });
    }
  },
}));
