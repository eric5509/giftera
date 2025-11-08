"use client";

import { create } from "zustand";
import { DisputeDataStore } from "@/entities/dispute/types/types";

export const useDisputeDataStore = create<DisputeDataStore>((set) => ({
  disputes: [],
  page: 1,
  limit: 20,
  isLoading: false,

  setDisputes: (disputes) => set({ disputes }),
  addDispute: (dispute) =>
    set((state) => ({ disputes: [dispute, ...state.disputes] })),
  updateDispute: (dispute) =>
    set((state) => ({
      disputes: state.disputes.map((d) => (d.id === dispute.id ? dispute : d)),
    })),
  removeDispute: (id) =>
    set((state) => ({ disputes: state.disputes.filter((d) => d.id !== id) })),

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setLoading: (isLoading) => set({ isLoading }),

  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  setSorting: (sort) => set((state) => ({ ...state, ...sort })),

  clearDisputes: () => set({ disputes: [], page: 1, limit: 10 }),
}));
