"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDisputeAction } from "@/app/serverActions/dispute/updateDisputeAction";
import { UpdateDisputeInput } from "@/entities/dispute/types/types";

export const useUpdateDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateDisputeInput }) =>
      updateDisputeAction(id, input),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["dispute", id] });
    },
  });
};
