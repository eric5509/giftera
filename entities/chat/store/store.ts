import { create } from "zustand";
import { GetChatsParams, ChatDataStore } from "../types/types";
import { getChatsAction } from "@/app/serverActions/chat/getChatsAction";

export const useChatDataStore = create<ChatDataStore>((set, get) => ({
  chats: [],
  filters: {},
  sorting: { sortBy: "createdAt", sortOrder: "asc" },
  pagination: { page: 1, limit: 20 },
  hasMore: true,
  loading: false,

  setChats: (chats) => set({ chats }),
  appendChats: (chats) =>
    set((state) => ({ chats: [...state.chats, ...chats] })),
  updateChat: (chat) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chat.id ? chat : c)),
    })),
  removeChat: (id) =>
    set((state) => ({ chats: state.chats.filter((c) => c.id !== id) })),

  setFilter: (filter) =>
    set((state) => ({
      filters: { ...state.filters, ...filter },
      pagination: { page: 1, limit: state.pagination.limit },
      hasMore: true,
      chats: [],
    })),
  setSorting: (sorting) =>
    set((state) => ({
      sorting: { ...state.sorting, ...sorting },
      pagination: { page: 1, limit: get().pagination.limit },
      hasMore: true,
      chats: [],
    })),
  reset: () =>
    set({
      chats: [],
      filters: {},
      sorting: { sortBy: "createdAt", sortOrder: "asc" },
      pagination: { page: 1, limit: 20 },
      hasMore: true,
      loading: false,
    }),

  fetchChats: async () => {
    const { filters, sorting, pagination } = get();
    set({ loading: true });
    try {
      const data = await getChatsAction({
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      } as GetChatsParams);
      set({ chats: data, hasMore: data.length === pagination.limit });
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMoreChats: async () => {
    const state = get();
    if (state.loading || !state.hasMore) return;

    set({ loading: true });
    try {
      const nextPage = state.pagination.page + 1;
      const data = await getChatsAction({
        ...state.filters,
        sortBy: state.sorting.sortBy,
        sortOrder: state.sorting.sortOrder,
        page: nextPage,
        limit: state.pagination.limit,
      } as GetChatsParams);

      set((s) => ({
        chats: [...s.chats, ...data],
        pagination: { ...s.pagination, page: nextPage },
        hasMore: data.length === s.pagination.limit,
      }));
    } catch (error) {
      console.error("Failed to fetch more chats:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
