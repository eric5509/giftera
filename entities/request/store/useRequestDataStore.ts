import { create } from "zustand";
import { RequestDataStore } from "../types/types";
import { getRequestsAction } from "@/app/serverActions/request/getRequestsAction";

export const useRequestDataStore = create<RequestDataStore>((set, get) => ({
  requests: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,

  setRequests: (requests) => set({ requests }),
  addRequest: (request) =>
    set((state) => ({ requests: [request, ...state.requests] })),
  updateRequest: (request) =>
    set((state) => ({
      requests: state.requests.map((r) => (r.id === request.id ? request : r)),
    })),
  removeRequest: (id) =>
    set((state) => ({ requests: state.requests.filter((r) => r.id !== id) })),

  setFilter: (filter) =>
    set((state) => ({
      filters: { ...state.filters, ...filter },
      pagination: { ...state.pagination, page: 1 },
    })),
  setSorting: (sorting) =>
    set((state) => ({ sorting: { ...state.sorting, ...sorting } })),
  setPagination: (pagination) =>
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  reset: () =>
    set({
      requests: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),

  fetchRequests: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });

    try {
      const data = await getRequestsAction({
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      });
      set({ requests: data });
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
