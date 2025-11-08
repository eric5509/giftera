

import { useQuery } from "@tanstack/react-query";
import { getBidsAction } from "@/app/serverActions/bid/getBidsAction";
import { GetBidsParams, Bid } from "@/entities/bid/types/types";

export const useGetBids = (params: GetBidsParams = {}, previousData?: Bid[]) =>
  useQuery<Bid[], Error>({
    queryKey: ["bids", params],
    queryFn: () => getBidsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 pattern
  });
