import { SubscriptionPlan } from "@/entities/subscriptionPlan/types/types";

export type SubscriptionStatus = "active" | "expired" | "cancelled";


export type Subscription = {
  id: string;
  vendorId: string;
  subscriptionPlanId: string; // foreign key to SubscriptionPlan
  plan?: SubscriptionPlan; // optional full plan info, contains name & price
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
  page?: number;
  limit?: number;
  sortBy?: keyof Subscription;
  sortOrder?: "asc" | "desc";
  filters?: {
    status?: SubscriptionStatus;
    vendorId?: string;
    subscriptionPlanId?: string;
  };
};

export type SubscriptionDataStore = {
  subscriptions: Subscription[];
  page: number;
  limit: number;
  total?: number;
  isLoading: boolean;

  filters?: GetAllSubscriptionsParams["filters"];
  sortBy?: keyof Subscription;
  sortOrder?: "asc" | "desc";

  setSubscriptions: (subs: Subscription[]) => void;
  addSubscription: (sub: Subscription) => void;
  updateSubscription: (sub: Subscription) => void;
  removeSubscription: (id: string) => void;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setLoading: (loading: boolean) => void;

  setFilters: (filters: GetAllSubscriptionsParams["filters"]) => void;
  setSorting: (sort: { sortBy?: keyof Subscription; sortOrder?: "asc" | "desc" }) => void;

  clearSubscriptions: () => void;
};
