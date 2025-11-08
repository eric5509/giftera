import { useQuery } from "@tanstack/react-query";
import { getVendorsAction } from "@/app/serverActions/vendor/getVendorsAction";
import { GetVendorsParams, Vendor } from "../types/vendor";

export const useGetVendors = (
  params: GetVendorsParams = {},
  previousData?: Vendor[]
) => {
  return useQuery<Vendor[], Error>({
    queryKey: ["vendors", params],
    queryFn: () => getVendorsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
};
