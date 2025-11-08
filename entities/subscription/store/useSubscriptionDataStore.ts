"use client";

import { create } from "zustand";
import { SubscriptionDataStore } from "@/entities/subscription/types/types";

export const useSubscriptionDataStore = create<SubscriptionDataStore>(
  (set) => ({
    subscriptions: [],
    page: 1,
    limit: 10,
    isLoading: false,

    setSubscriptions: (subscriptions) => set({ subscriptions }),
    addSubscription: (sub) =>
      set((state) => ({ subscriptions: [sub, ...state.subscriptions] })),
    updateSubscription: (sub) =>
      set((state) => ({
        subscriptions: state.subscriptions.map((s) =>
          s.id === sub.id ? sub : s
        ),
      })),
    removeSubscription: (id) =>
      set((state) => ({
        subscriptions: state.subscriptions.filter((s) => s.id !== id),
      })),

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),
    setLoading: (isLoading) => set({ isLoading }),

    setFilters: (filters) => set((state) => ({ ...state, ...filters })),
    setSorting: (sort) => set((state) => ({ ...state, ...sort })),

    clearSubscriptions: () => set({ subscriptions: [], page: 1, limit: 10 }),
  })
);
