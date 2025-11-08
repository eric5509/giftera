export type WishlistItem = {
  id: string;
  userId: string; // Buyer who owns this wishlist item
  title: string; // Name of the item
  description?: string; // Optional description
  photoUrls?: string[]; // Optional images
  category?: string; // Optional category
  link?: string; // Optional external link
  createdAt: string;
  updatedAt?: string;
};

export type CreateWishlistItemInput = {
  userId: string;
  title: string;
  description?: string;
  photoUrls?: string[];
  category?: string;
  link?: string;
};

export type UpdateWishlistItemInput = {
  id: string;
  title?: string;
  description?: string;
  photoUrls?: string[];
  category?: string;
  link?: string;
};

export type GetWishlistItemsParams = {
  userId?: string;
  category?: string;
  searchQuery?: string;
  sortBy?: keyof WishlistItem; // e.g., createdAt, title
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type WishlistDataStore = {
  items: WishlistItem[];
  filters: {
    userId?: string;
    category?: string;
    searchQuery?: string;
  };
  sorting: {
    sortBy: keyof WishlistItem;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // Actions
  setItems: (items: WishlistItem[]) => void;
  addItem: (item: WishlistItem) => void;
  updateItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  setFilter: (filter: Partial<WishlistDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<WishlistDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<WishlistDataStore["pagination"]>) => void;
  reset: () => void;
};

