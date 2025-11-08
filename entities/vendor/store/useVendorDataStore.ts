import { create } from "zustand";
import { Vendor, SubscriptionPlan, VendorDataStore } from "../types/vendor";

export const useVendorDataStore = create<VendorDataStore>((set) => ({
  vendors: [],
  page: 1,
  limit: 10,
  total: undefined,
  isLoading: false,

  businessType: undefined,
  verified: undefined,
  subscriptionPlan: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",

  setVendors: (vendors) => set({ vendors }),
  addVendor: (vendor) => set((state) => ({ vendors: [vendor, ...state.vendors] })),
  updateVendor: (vendor) =>
    set((state) => ({
      vendors: state.vendors.map((v) => (v.id === vendor.id ? vendor : v)),
    })),
  removeVendor: (id) =>
    set((state) => ({
      vendors: state.vendors.filter((v) => v.id !== id),
    })),

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setLoading: (loading) => set({ isLoading: loading }),

  setFilters: (filters) =>
    set({
      businessType: filters.businessType,
      verified: filters.verified,
      subscriptionPlan: filters.subscriptionPlan,
      page: 1, // reset to first page when filters change
    }),

  setSorting: (sort) =>
    set({
      sortBy: sort.sortBy || "createdAt",
      sortOrder: sort.sortOrder || "desc",
      page: 1, // reset to first page when sorting changes
    }),

  clearVendors: () =>
    set({
      vendors: [],
      page: 1,
      total: undefined,
      businessType: undefined,
      verified: undefined,
      subscriptionPlan: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
}));
