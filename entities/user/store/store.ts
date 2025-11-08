import { create } from "zustand";
import {
  getUsersAction,
} from "@/app/serverActions/user/getUsersAction";
import { UserDataStore } from "../types/types";

export const useUserDataStore = create<UserDataStore>((set, get) => ({
  users: [],
  filters: {},
  pagination: { page: 1, limit: 10 },
  hasMore: true,
  loading: false,

  setFilters: (filters) =>
    set({ filters, pagination: { ...get().pagination, page: 1 } }),

  fetchUsers: async () => {
    const { filters, pagination } = get();
    set({ loading: true });
    try {
      const data = await getUsersAction({ ...filters, ...pagination });
      set({ users: data, hasMore: data.length === pagination.limit });
    } finally {
      set({ loading: false });
    }
  },

  fetchMoreUsers: async () => {
    const state = get();
    if (!state.hasMore || state.loading) return;
    set({ loading: true });
    try {
      const nextPage = state.pagination.page + 1;
      const data = await getUsersAction({
        ...state.filters,
        page: nextPage,
        limit: state.pagination.limit,
      });
      set((s) => ({
        users: [...s.users, ...data],
        pagination: { ...s.pagination, page: nextPage },
        hasMore: data.length === s.pagination.limit,
      }));
    } finally {
      set({ loading: false });
    }
  },
}));
