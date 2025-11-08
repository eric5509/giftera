import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TransactionStatus } from "../types/types";
import { updateTransactionStatusAction } from "@/app/serverActions/transaction/updateTransactionStatusAction";

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TransactionStatus }) =>
      updateTransactionStatusAction(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", variables.id] });
    },
  });
};
