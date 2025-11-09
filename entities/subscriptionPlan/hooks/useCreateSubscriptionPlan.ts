import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSubscriptionPlanInput, SubscriptionPlan } from "../types/types";
import { createSubscriptionPlanAction } from "@/app/serverActions/subscriptionPlan/createSubscriptionPlanAction";

export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<SubscriptionPlan, Error, CreateSubscriptionPlanInput>({
    mutationFn: (input) => createSubscriptionPlanAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptionPlans"] });
    },
  });
};
