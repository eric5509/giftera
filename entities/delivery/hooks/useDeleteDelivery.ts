import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeliveryAction } from "@/app/serverActions/delivery/deleteDeliveryAction";
import { Delivery } from "@/entities/delivery/types/types";

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDeliveryAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Delivery[]>(["deliveries"], (old) =>
        old?.filter((d) => d.id !== id) || []
      );
      queryClient.invalidateQueries({ queryKey: ["deliveries", id] });
    },
  });
};
