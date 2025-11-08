import { useQuery } from "@tanstack/react-query";
import { getDeliveryByIdAction } from "@/app/serverActions/delivery/getDeliveryByIdAction";
import { Delivery } from "@/entities/delivery/types/types";

export const useGetDeliveryById = (id: string) =>
  useQuery<Delivery, Error>({
    queryKey: ["deliveries", id],
    queryFn: () => getDeliveryByIdAction(id),
    enabled: !!id,
  });
