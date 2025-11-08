export type Buyer = {
  id: string;
  userId: string; // links to User table
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  county: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBuyerInput = {
  userId: string; 
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  county: string;
  address: string;
};

export type BuyerDataStore = {
  buyers: Buyer[];
  filters: { userId?: string };
  sorting: { sortBy: keyof Buyer; sortOrder: "asc" | "desc" };
  pagination: { page: number; limit: number };
  hasMore: boolean;
  loading: boolean;

  setBuyers: (buyers: Buyer[]) => void;
  appendBuyers: (buyers: Buyer[]) => void;
  setFilters: (filters: { userId?: string }) => void;
  setSorting: (sorting: {
    sortBy: keyof Buyer;
    sortOrder: "asc" | "desc";
  }) => void;
  fetchBuyers: () => Promise<void>;
  fetchMoreBuyers: () => Promise<void>;
};
