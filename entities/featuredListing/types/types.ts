export type FeaturedListingStatus = "ACTIVE" | "EXPIRED" | "CANCELLED";

export type FeaturedListing = {
  id: string;
  vendorId: string;
  requestId?: string;
  priorityLevel: number;
  activeFrom: string;
  activeUntil: string;
  amountPaid: number;
  currency: string;
  paymentId?: string;
  status: FeaturedListingStatus;
  createdAt: string;
  updatedAt?: string;
};

// ─── Input Types ────────────────────────────────
export type CreateFeaturedListingInput = {
  vendorId: string;
  requestId?: string;
  priorityLevel: number;
  activeFrom: string;
  activeUntil: string;
  amountPaid: number;
  currency: string;
  paymentId?: string;
};

export type UpdateFeaturedListingInput = {
  id: string;
  priorityLevel?: number;
  activeFrom?: string;
  activeUntil?: string;
  amountPaid?: number;
  currency?: string;
  paymentId?: string;
  status?: FeaturedListingStatus;
};

export type GetAllFeaturedListingsParams = {
  vendorId?: string;
  requestId?: string;
  status?: FeaturedListing["status"];
  priorityLevel?: number;
  searchQuery?: string; // search by vendor name maybe
  sortBy?: keyof FeaturedListing;
  sortOrder?: "asc" | "desc";
  activeFrom?: string; // filter listings active after this date
  activeUntil?: string; // filter listings active before this date
  page?: number;
  limit?: number;
};

export type FeaturedListingDataStore = {
  listings: FeaturedListing[];
  filters: {
    vendorId?: string;
    requestId?: string;
    status?: FeaturedListing["status"];
    priorityLevel?: number;
    searchQuery?: string;
  };
  sorting: {
    sortBy: keyof FeaturedListing;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // Actions
  setListings: (listings: FeaturedListing[]) => void;
  addListing: (listing: FeaturedListing) => void;
  updateListing: (listing: FeaturedListing) => void;
  removeListing: (id: string) => void;
  setFilter: (filter: Partial<FeaturedListingDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<FeaturedListingDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<FeaturedListingDataStore["pagination"]>) => void;
  reset: () => void;
};
