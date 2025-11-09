import { useQuery } from "@tanstack/react-query";
import { GetAllSubscriptionPlansParams, SubscriptionPlan } from "../types/types";
import { getSubscriptionPlansAction } from "@/app/serverActions/subscriptionPlan/getSubscriptionPlansAction";

export const useGetSubscriptionPlans = (
  params: GetAllSubscriptionPlansParams = {},
  previousData?: SubscriptionPlan[]
) =>
  useQuery<SubscriptionPlan[], Error>({
    queryKey: ["subscriptionPlans", params],
    queryFn: () => getSubscriptionPlansAction(params),
    placeholderData: previousData, // v5 replacement for initial data
  });
