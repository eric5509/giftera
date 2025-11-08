export type SubscriptionStatus = "active" | "expired" | "cancelled";

export type Subscription = {
  id: string;
  vendorId: string;
  subscriptionPlanId: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt?: string;
};

export type CreateSubscriptionInput = {
  vendorId: string;
  subscriptionPlanId: string;
  startDate: string;
  endDate: string;
};

export type UpdateSubscriptionInput = Partial<Omit<Subscription, "id" | "createdAt">>;

export type GetAllSubscriptionsParams = {
  page?: number; // current page number
  limit?: number; // items per page
  sortBy?: keyof Subscription; // field to sort by
  sortOrder?: "asc" | "desc"; // sorting direction
  filters?: {
    status?: string;
    userId?: string;
    planId?: string;
  };
}


export type SubscriptionDataStore = {
  subscriptions: Subscription[];
  page: number;
  limit: number;
  total?: number;
  isLoading: boolean;

  // Filters & sorting
  status?: string;
  userId?: string;
  planId?: string;
  sortBy?: keyof Subscription;
  sortOrder?: "asc" | "desc";

  // Actions
  setSubscriptions: (subs: Subscription[]) => void;
  addSubscription: (sub: Subscription) => void;
  updateSubscription: (sub: Subscription) => void;
  removeSubscription: (id: string) => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setLoading: (loading: boolean) => void;

  setFilters: (filters: {
    status?: string;
    userId?: string;
    planId?: string;
  }) => void;

  setSorting: (sort: { sortBy?: keyof Subscription; sortOrder?: "asc" | "desc" }) => void;

  clearSubscriptions: () => void;
}

