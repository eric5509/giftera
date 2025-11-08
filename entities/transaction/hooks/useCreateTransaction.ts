import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionPayload } from "../types/types";
import { createTransactionAction } from "@/app/serverActions/transaction/createTransactionAction";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => createTransactionAction(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
