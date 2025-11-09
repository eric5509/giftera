"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDisputeInput, Dispute } from "@/entities/dispute/types/types";
import { createDisputeAction } from "@/app/serverActions/dispute/createDisputeAction";

export const useCreateDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateDisputeInput) => createDisputeAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
};
