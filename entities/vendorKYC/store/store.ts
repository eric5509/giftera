import { create } from "zustand";
import { VendorKYCDataStore } from "../types/types";

export const useVendorKYCDataStore = create<VendorKYCDataStore>((set) => ({
  vendorKYCs: [],
  filters: [],
  sort: null,
  currentPage: 1,
  pageSize: 10,
  setVendorKYCs: (data) => set({ vendorKYCs: data }),
  addVendorKYC: (data) =>
    set((state) => ({ vendorKYCs: [data, ...state.vendorKYCs] })),
  updateVendorKYC: (data) =>
    set((state) => ({
      vendorKYCs: state.vendorKYCs.map((k) => (k.id === data.id ? data : k)),
    })),
  deleteVendorKYC: (id) =>
    set((state) => ({
      vendorKYCs: state.vendorKYCs.filter((k) => k.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  reset: () =>
    set({
      vendorKYCs: [],
      filters: [],
      sort: null,
      currentPage: 1,
      pageSize: 10,
    }),
}));
