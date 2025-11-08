import { getVendorKYCsAction } from "@/app/serverActions/vendorKYC/getVendorKYCsAction";
import { useQuery } from "@tanstack/react-query";
import { VendorKYC } from "../types/types";

export const useGetVendorKYCs = (params?: any, previousData?: VendorKYC[]) =>
  useQuery<VendorKYC[], Error>({
    queryKey: ["vendorKYC", params],
    queryFn: () => getVendorKYCsAction(params),
    placeholderData: () => previousData,
  });
