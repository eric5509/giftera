import { create } from "zustand";
import { Notification } from "../types/types";

interface NotificationState {
  notifications: Notification[];
  page: number;
  limit: number;
  total?: number; 
  isLoading: boolean;
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  setPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  clearNotifications: () => void;
}

export const useNotificationDataStore = create<NotificationState>((set) => ({
  notifications: [],
  page: 1,
  limit: 10,
  total: undefined,
  isLoading: false,
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  setPage: (page) => set({ page }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearNotifications: () => set({ notifications: [], page: 1, total: undefined }),
}));
