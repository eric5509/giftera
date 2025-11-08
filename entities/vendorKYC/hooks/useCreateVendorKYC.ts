import { createVendorKYCAction } from "@/app/serverActions/vendorKYC/createVendorKYCAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VendorKYC } from "../types/types";

export const useCreateVendorKYC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVendorKYCAction,
    onSuccess: (newKYC) => {
      queryClient.setQueryData<VendorKYC[] | undefined>(["vendorKYC"], (old) =>
        old ? [newKYC, ...old] : [newKYC]
      );
    },
  });
};
