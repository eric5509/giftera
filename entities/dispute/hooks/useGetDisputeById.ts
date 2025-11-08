"use client";

import { useQuery } from "@tanstack/react-query";
import { getDisputeByIdAction } from "@/app/serverActions/dispute/getDisputeByIdAction";

export const useGetDisputeById = (id?: string) => {
  return useQuery({
    queryKey: ["dispute", id],
    queryFn: () => (id ? getDisputeByIdAction(id) : Promise.resolve(null)),
    enabled: !!id,
  });
};
