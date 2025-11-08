import { useQuery } from "@tanstack/react-query";
import { getDeliveriesAction } from "@/app/serverActions/delivery/getDeliveriesAction";
import { Delivery, GetDeliveriesParams } from "@/entities/delivery/types/types";

export const useGetDeliveries = (params: GetDeliveriesParams = {}, previousData?: Delivery[]) =>
  useQuery<Delivery[], Error>({
    queryKey: ["deliveries", params],
    queryFn: () => getDeliveriesAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 pattern
  });
