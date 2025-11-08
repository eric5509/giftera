import { useQuery } from "@tanstack/react-query";
import { GetRequestsParams, Request } from "@/entities/request/types/types";
import { getRequestsAction } from "@/app/serverActions/request/getRequestsAction";

export const useGetRequests = (
  params: GetRequestsParams = {},
  previousData?: Request[]
) =>
  useQuery<Request[], Error>({
    queryKey: ["requests", params],
    queryFn: () => getRequestsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
