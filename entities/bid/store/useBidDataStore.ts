import { create } from "zustand";
import { Bid, BidDataStore } from "../types/types";
import { getBidsAction } from "@/app/serverActions/bid/getBidsAction";


export const useBidDataStore = create<BidDataStore>((set, get) => ({
  bids: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,

  setBids: (bids) => set({ bids }),
  addBid: (bid) => set((state) => ({ bids: [bid, ...state.bids] })),
  updateBid: (bid) =>
    set((state) => ({
      bids: state.bids.map((b) => (b.id === bid.id ? bid : b)),
    })),
  removeBid: (id) => set((state) => ({ bids: state.bids.filter((b) => b.id !== id) })),

  setFilter: (filter) =>
    set((state) => ({
      filters: { ...state.filters, ...filter },
      pagination: { ...state.pagination, page: 1 }, // reset page
    })),
  setSorting: (sorting) =>
    set((state) => ({ sorting: { ...state.sorting, ...sorting } })),
  setPagination: (pagination) =>
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  reset: () =>
    set({
      bids: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),

  fetchBids: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });
    try {
      const data = await getBidsAction({
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      });
      set({ bids: data });
    } catch (error) {
      console.error("Failed to fetch bids:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
