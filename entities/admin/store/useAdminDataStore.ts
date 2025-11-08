import { create } from "zustand";
import { Admin, AdminDataStore } from "../types/types";
import { getAdminsAction } from "@/app/serverActions/admin/getAdminsAction";

export const useAdminDataStore = create<AdminDataStore>((set, get) => ({
  admins: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "desc" },
  pagination: { page: 1, limit: 10 },
  loading: false,

  setAdmins: (admins) => set({ admins }),
  addAdmin: (admin) => set((state) => ({ admins: [admin, ...state.admins] })),
  updateAdmin: (admin) =>
    set((state) => ({
      admins: state.admins.map((a) => (a.id === admin.id ? admin : a)),
    })),
  removeAdmin: (id) =>
    set((state) => ({ admins: state.admins.filter((a) => a.id !== id) })),

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
      admins: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "desc" },
      pagination: { page: 1, limit: 10 },
      loading: false,
    }),

  fetchAdmins: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });
    try {
      const data = await getAdminsAction({
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      });
      set({ admins: data });
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
