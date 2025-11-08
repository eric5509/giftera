import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVendorAction } from "@/app/serverActions/vendor/updateVendorAction";
import { UpdateVendorInput, Vendor } from "../types/vendor";

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateVendorInput) => updateVendorAction(input),
    onSuccess: (updatedVendor: Vendor) => {
      // Update the vendors list cache
      queryClient.setQueryData<Vendor[]>(
        ["vendors"],
        (old) =>
          old?.map((v) => (v.id === updatedVendor.id ? updatedVendor : v)) || []
      );
      queryClient.invalidateQueries({ 
        queryKey: ["vendors", updatedVendor.id] 
      });
    },
  });
};