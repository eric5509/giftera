"use client";
import { create } from "zustand";
import { FeaturedListingDataStore } from "../types/types";


export const useFeaturedListingStore = create<FeaturedListingDataStore  >((set, get) => ({
  listings: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,
  setListings: (listings) => set({ listings }),
  addListing: (listing) => set({ listings: [listing, ...get().listings] }),
  updateListing: (listing) =>
    set({ listings: get().listings.map((l) => (l.id === listing.id ? listing : l)) }),
  removeListing: (id) => set({ listings: get().listings.filter((l) => l.id !== id) }),
  setFilter: (filter) => set({ filters: { ...get().filters, ...filter } }),
  setSorting: (sorting) => set({ sorting: { ...get().sorting, ...sorting } }),
  setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),
  reset: () =>
    set({
      listings: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),
}));
