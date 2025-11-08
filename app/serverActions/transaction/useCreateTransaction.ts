import { createTransactionAction,  } from "@/app/serverActions/transaction/createTransactionAction";
import { CreateTransactionPayload } from "@/entities/transaction/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => createTransactionAction(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
