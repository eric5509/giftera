import { useQuery } from "@tanstack/react-query";
import { getBuyersAction } from "@/app/serverActions/buyer/getBuyersAction";
import { Buyer } from "../types/types";

export const useGetBuyers = (params?: Parameters<typeof getBuyersAction>[0], previousData?: Buyer[]) =>
  useQuery<Buyer[], Error>({
    queryKey: ["buyers", params],
    queryFn: () => getBuyersAction(params),
    placeholderData: (previousData) => previousData, // v5 smooth pagination
  });
