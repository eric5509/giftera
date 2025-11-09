export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  description?: string;
  features?: Record<string, any> | null;
  createdAt: string;
  updatedAt?: string;
};

export type CreateSubscriptionPlanInput = Omit<
  SubscriptionPlan,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateSubscriptionPlanInput = Partial<
  Omit<SubscriptionPlan, "id" | "createdAt">
>;

export type GetAllSubscriptionPlansParams = {
  page?: number;
  limit?: number;
  sortBy?: keyof SubscriptionPlan;
  sortOrder?: "asc" | "desc";
};
