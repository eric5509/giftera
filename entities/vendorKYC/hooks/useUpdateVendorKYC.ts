import { updateVendorKYCAction } from "@/app/serverActions/vendorKYC/updateVendorKYCAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VendorKYC } from "../types/types";

export const useUpdateVendorKYC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVendorKYCAction,
    onSuccess: (updatedKYC) => {
      queryClient.setQueryData<VendorKYC[] | undefined>(["vendorKYC"], (old) =>
        old?.map((k) => (k.id === updatedKYC.id ? updatedKYC : k)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["vendorKYC", updatedKYC.id] });
    },
  });
};
