import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBuyerAction } from "@/app/serverActions/buyer/updateBuyerAction";
import { Buyer } from "../types/types";

export const useUpdateBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBuyerAction,
    onSuccess: (updated: Buyer) => {
      queryClient.setQueryData<Buyer[] | undefined>(["buyers"], (old) =>
        old?.map((b) => (b.id === updated.id ? updated : b)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["buyers", updated.id] });
    },
  });
};
