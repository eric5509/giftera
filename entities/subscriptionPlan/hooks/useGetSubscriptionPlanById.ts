import { useQuery } from "@tanstack/react-query";
import { SubscriptionPlan } from "../types/types";
import { getSubscriptionPlanByIdAction } from "@/app/serverActions/subscriptionPlan/getSubscriptionPlanByIdAction";

export const useGetSubscriptionPlanById = (
  id: string,
  previousData?: SubscriptionPlan
) =>
  useQuery<SubscriptionPlan, Error>({
    queryKey: ["subscriptionPlan", id],
    queryFn: () => getSubscriptionPlanByIdAction(id),
    enabled: !!id,
    placeholderData: previousData,
  });
