import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBuyerAction } from "@/app/serverActions/buyer/createBuyerAction";
import { Buyer } from "../types/types";

export const useCreateBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBuyerAction,
    onSuccess: (newBuyer: Buyer) => {
      queryClient.setQueryData<Buyer[] | undefined>(["buyers"], (old) =>
        old ? [newBuyer, ...old] : [newBuyer]
      );
    },
  });
};
