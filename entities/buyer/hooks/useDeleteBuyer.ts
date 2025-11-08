import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBuyerAction } from "@/app/serverActions/buyer/deleteBuyerAction";
import { Buyer } from "../types/types";

export const useDeleteBuyer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBuyerAction,
    onSuccess: ({ id }: { id: string }) => {
      queryClient.setQueryData<Buyer[] | undefined>(["buyers"], (old) =>
        old?.filter((b) => b.id !== id) || []
      );
    },
  });
};
