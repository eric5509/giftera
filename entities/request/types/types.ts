export type RequestStatus = "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";

export interface Request {
  id: string;
  userId: string; // buyer
  title: string;
  description?: string;
  photoUrls?: string[];
  deliveryTime: string; // ISO string
  location: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRequestInput {
  userId: string;
  title: string;
  photos?: File[]; // 👈 this replaces photoUrls
  description?: string;
  deliveryTime: string;
  location: string;
}

export interface UpdateRequestInput {
  id: string;
  title?: string;
  description?: string;
  photoUrls?: string[];
  deliveryTime?: string;
  location?: string;
  status?: RequestStatus;
}

export interface GetRequestsParams {
  userId?: string;
  status?: RequestStatus;
  sortBy?: keyof Request;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export type RequestDataStore = {
  requests: Request[];
  filters: {
    userId?: string;
    status?: RequestStatus;
  };
  sorting: {
    sortBy: keyof Request;
    sortOrder: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
  };
  loading: boolean;

  // actions
  setRequests: (requests: Request[]) => void;
  addRequest: (request: Request) => void;
  updateRequest: (request: Request) => void;
  removeRequest: (id: string) => void;
  setFilter: (filter: Partial<RequestDataStore["filters"]>) => void;
  setSorting: (sorting: Partial<RequestDataStore["sorting"]>) => void;
  setPagination: (pagination: Partial<RequestDataStore["pagination"]>) => void;
  reset: () => void;

  // fetch requests based on current state
  fetchRequests: () => Promise<void>;
};
