"use client";

import { create } from "zustand";
import { WishlistDataStore } from "../types/types";

export const useWishlistStore = create<WishlistDataStore>((set, get) => ({
  items: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,
  setItems: (items) => set({ items }),
  addItem: (item) => set({ items: [item, ...get().items] }),
  updateItem: (item) =>
    set({ items: get().items.map((i) => (i.id === item.id ? item : i)) }),
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  setFilter: (filter) => set({ filters: { ...get().filters, ...filter } }),
  setSorting: (sorting) => set({ sorting: { ...get().sorting, ...sorting } }),
  setPagination: (pagination) =>
    set({ pagination: { ...get().pagination, ...pagination } }),
  reset: () =>
    set({
      items: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),
}));
