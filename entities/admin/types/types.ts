export type AdminRole = "SUPER_ADMIN" | "MODERATOR";

export type Admin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt?: string;
};

export type CreateAdminInput = {
  firstName: string;
  lastName: string;
  email: string;
  role?: AdminRole; // default SUPER_ADMIN
};

export type UpdateAdminInput = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: AdminRole;
};

export type GetAdminsParams = {
  role?: "SUPER_ADMIN" | "MODERATOR";
  sortBy?: keyof Admin;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};



export type AdminDataStore = {
  admins: Admin[];
  filters: {
    role?: "SUPER_ADMIN" | "MODERATOR";
  };
  sorting: {
    sortBy: keyof Admin;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // Actions
  setAdmins: (admins: Admin[]) => void;
  addAdmin: (admin: Admin) => void;
  updateAdmin: (admin: Admin) => void;
  removeAdmin: (id: string) => void;
  setFilter: (filter: Partial<AdminDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<AdminDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<AdminDataStore["pagination"]>) => void;
  reset: () => void;

  // Fetch admins using current store state
  fetchAdmins: () => Promise<void>;
};
