import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryAction } from "@/app/serverActions/delivery/createDeliveryAction";
import { Delivery } from "../types/types";

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDeliveryAction,
    onSuccess: (newDelivery: Delivery) => {
      queryClient.setQueryData<Delivery[] | undefined>(["deliveries"], (old) =>
        old ? [newDelivery, ...old] : [newDelivery]
      );
    },
  });
};
