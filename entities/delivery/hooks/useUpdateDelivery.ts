import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeliveryAction } from "@/app/serverActions/delivery/updateDeliveryAction";
import { UpdateDeliveryInput, Delivery } from "@/entities/delivery/types/types";

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateDeliveryInput) => updateDeliveryAction(input),
    onSuccess: (updatedDelivery: Delivery) => {
      queryClient.setQueryData<Delivery[]>(["deliveries"], (old) =>
        old?.map((d) => (d.id === updatedDelivery.id ? updatedDelivery : d)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["deliveries", updatedDelivery.id] });
    },
  });
};
