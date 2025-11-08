

import { useQuery } from "@tanstack/react-query";
import { getBidByIdAction } from "@/app/serverActions/bid/getBidByIdAction";
import { Bid } from "@/entities/bid/types/types";

export const useGetBidById = (id: string) =>
  useQuery<Bid, Error>({
    queryKey: ["bids", id],
    queryFn: () => getBidByIdAction(id),
    enabled: !!id,
  });
