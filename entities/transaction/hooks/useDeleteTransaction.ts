import { deleteTransactionAction } from "@/app/serverActions/transaction/deleteTransactionAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransactionAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
