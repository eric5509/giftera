import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVendorAction } from "@/app/serverActions/vendor/deleteVendorAction";

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendorAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(
        ["vendors"],
        (old: any) => old?.filter((v: any) => v.id !== id) || []
      );
    },
  });
};
