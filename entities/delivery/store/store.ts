import { create } from "zustand";
import {
  DeliveryDataStore,
  GetDeliveriesParams,
} from "../types/types";
import { getDeliveriesAction } from "@/app/serverActions/delivery/getDeliveriesAction";

export const useDeliveryDataStore = create<DeliveryDataStore>((set, get) => ({
  deliveries: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,

  setDeliveries: (deliveries) => set({ deliveries }),
  addDelivery: (delivery) =>
    set((state) => ({ deliveries: [delivery, ...state.deliveries] })),
  updateDelivery: (delivery) =>
    set((state) => ({
      deliveries: state.deliveries.map((d) =>
        d.id === delivery.id ? delivery : d
      ),
    })),
  removeDelivery: (id) =>
    set((state) => ({
      deliveries: state.deliveries.filter((d) => d.id !== id),
    })),
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
      deliveries: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),

  fetchDeliveries: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });
    try {
      const data = await getDeliveriesAction({
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      } as GetDeliveriesParams);
      set({ deliveries: data });
    } catch (error) {
      console.error("Failed to fetch deliveries:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
