

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBidAction } from "@/app/serverActions/bid/updateBidAction";
import { UpdateBidInput, Bid } from "@/entities/bid/types/types";

export const useUpdateBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateBidInput) => updateBidAction(input),
    onSuccess: (updatedBid: Bid) => {
      queryClient.setQueryData<Bid[]>(["bids"], (old) =>
        old?.map((b) => (b.id === updatedBid.id ? updatedBid : b)) || []
      );

      queryClient.invalidateQueries({ queryKey: ["bids", updatedBid.id] });
    },
  });
};
