import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVendorAction } from "@/app/serverActions/vendor/createVendorAction";
import { CreateVendorInput, Vendor } from "../types/vendor";

export const useCreateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVendorInput) => createVendorAction(input),
    onSuccess: (newVendor: Vendor) => {
      // Optionally update cache if you have a vendors list
      queryClient.setQueryData<Vendor[] | undefined>(
        ["vendors"],
        (old) => (old ? [...old, newVendor] : [newVendor])
      );
    },
  });
};
