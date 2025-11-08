

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBidAction } from "@/app/serverActions/bid/deleteBidAction";
import { Bid } from "@/entities/bid/types/types";

export const useDeleteBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBidAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Bid[]>(["bids"], (old) =>
        old?.filter((b) => b.id !== id) || []
      );
      queryClient.invalidateQueries({ queryKey: ["bids", id] });
    },
  });
};
