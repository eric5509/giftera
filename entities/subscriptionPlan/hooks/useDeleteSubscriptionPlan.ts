import { deleteSubscriptionPlanAction } from "@/app/serverActions/subscriptionPlan/deleteSubscriptionPlanAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSubscriptionPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: (id) => deleteSubscriptionPlanAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptionPlans"] });
    },
  });
};
