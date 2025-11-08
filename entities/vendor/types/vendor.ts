// entities/vendor/types/types.ts

// ─── Vendor Entity ────────────────────────────────
export type Vendor = {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  address: string;
  logoUrl?: string;
  verified: boolean;
  subscriptionPlan: {
    id: string;
    name: string;
  }; // now it stores the full object
  rating?: number;
  createdAt: string;
  updatedAt?: string;
};


// ─── Input Types ────────────────────────────────
export type CreateVendorInput = {
  userId: string;
  businessName: string;
  businessType: string;
  address: string;
  logo?: File | string; // allow file upload or URL
  subscriptionPlanId?: string; // optional, defaults to FREE on backend
};

export type UpdateVendorInput = {
  id: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  verified?: boolean;
  subscriptionPlanId?: string;
};

// ─── Query Params ────────────────────────────────
export type GetVendorsParams = {
  businessType?: string;
  verified?: boolean;
  subscriptionPlanId?: string;
  sortBy?: keyof Vendor; // e.g., "createdAt" | "rating" | "businessName"
  sortOrder?: "asc" | "desc";
  page?: number;
  searchQuery?: string;
  limit?: number;
};

// ─── Vendor Store ────────────────────────────────
export type VendorDataStore = {
  vendors: Vendor[];
  page: number;
  limit: number;
  total?: number;
  isLoading: boolean;

  // Filters & sorting
  businessType?: string;
  verified?: boolean;
  subscriptionPlanId?: string;
  sortBy?: keyof Vendor;
  sortOrder?: "asc" | "desc";

  // Actions
  setVendors: (vendors: Vendor[]) => void;
  addVendor: (vendor: Vendor) => void;
  updateVendor: (vendor: Vendor) => void;
  removeVendor: (id: string) => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setLoading: (loading: boolean) => void;

  setFilters: (filters: {
    businessType?: string;
    verified?: boolean;
    subscriptionPlanId?: string;
  }) => void;

  setSorting: (sort: { sortBy?: keyof Vendor; sortOrder?: "asc" | "desc" }) => void;

  clearVendors: () => void;
};
