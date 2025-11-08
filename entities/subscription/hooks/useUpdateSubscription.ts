"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateSubscriptionInput, Subscription } from "@/entities/subscription/types/types";
import { updateSubscriptionAction } from "@/app/serverActions/subscription/updateSubscriptionAction";

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSubscriptionInput }) =>
      updateSubscriptionAction(id, input),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscription", id] });
    },
  });
};
