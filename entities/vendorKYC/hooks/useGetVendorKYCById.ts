import { useQuery } from "@tanstack/react-query";
import { VendorKYC } from "../types/types";
import { getVendorKYCByIdAction } from "@/app/serverActions/vendorKYC/getVendorKYCByIdAction";

export const useGetVendorKYCById = (id?: string) => {
  return useQuery<VendorKYC, Error>({
    queryKey: ["vendorKYC", id],
    queryFn: () => {
      if (!id) throw new Error("Vendor KYC ID is required");
      return getVendorKYCByIdAction(id);
    },
    enabled: !!id, // only run when id exists
  });
};
