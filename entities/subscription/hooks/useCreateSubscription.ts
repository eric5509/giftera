"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSubscriptionInput } from "@/entities/subscription/types/types";
import { createSubscriptionAction } from "@/app/serverActions/subscription/createSubscriptionAction";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSubscriptionInput) => createSubscriptionAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
