"use client";

import { deleteSubscriptionAction } from "@/app/serverActions/subscription/deleteSubscriptionAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSubscriptionAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
