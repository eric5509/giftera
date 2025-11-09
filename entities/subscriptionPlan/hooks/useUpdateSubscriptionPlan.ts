import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionPlan, UpdateSubscriptionPlanInput } from "../types/types";
import { updateSubscriptionPlanAction } from "@/app/serverActions/subscriptionPlan/updateSubscriptionPlanAction";

export const useUpdateSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<SubscriptionPlan, Error, { id: string; input: UpdateSubscriptionPlanInput }>({
    mutationFn: ({ id, input }) => updateSubscriptionPlanAction(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptionPlans"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionPlan", variables.id] });
    },
  });
};
