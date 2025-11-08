import { useQuery } from "@tanstack/react-query";
import { Request } from "@/entities/request/types/types";
import { getRequestByIdAction } from "@/app/serverActions/request/getRequestByIdAction";

export const useGetRequestById = (id: string) =>
  useQuery<Request, Error>({
    queryKey: ["requests", id],
    queryFn: () => getRequestByIdAction(id),
    enabled: !!id,
  });
