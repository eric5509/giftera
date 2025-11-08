"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDisputeAction } from "@/app/serverActions/dispute/deleteDisputeAction";

export const useDeleteDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDisputeAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });
};
