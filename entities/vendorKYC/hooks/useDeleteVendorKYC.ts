import { deleteVendorKYCAction } from "@/app/serverActions/vendorKYC/deleteVendorKYCAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VendorKYC } from "../types/types";

export const useDeleteVendorKYC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVendorKYCAction,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<VendorKYC[] | undefined>(["vendorKYC"], (old) =>
        old?.filter((k) => k.id !== id) || []
      );
    },
  });
};
