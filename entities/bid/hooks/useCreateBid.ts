import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBidAction } from "@/app/serverActions/bid/createBidAction";
import { CreateBidInput, Bid } from "@/entities/bid/types/types";

export const useCreateBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBidInput) => createBidAction(input),
    onSuccess: (newBid: Bid) => {
      // Prepend the new bid to the list cache
      queryClient.setQueryData<Bid[]>(["bids"], (old) =>
        old ? [newBid, ...old] : [newBid]
      );
    },
  });
};
