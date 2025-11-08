import { create } from "zustand";
import { Transaction } from "../types/types";

interface TransactionDataStore {
  transactions: Transaction[];
  filters: { buyerId?: string; vendorId?: string; status?: string };
  currentPage: number;
  setTransactions: (txs: Transaction[]) => void;
  setFilters: (filters: TransactionDataStore["filters"]) => void;
  setCurrentPage: (page: number) => void;
}

export const useTransactionDataStore = create<TransactionDataStore>((set) => ({
  transactions: [],
  filters: {},
  currentPage: 1,
  setTransactions: (transactions) => set({ transactions }),
  setFilters: (filters) => set({ filters }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
