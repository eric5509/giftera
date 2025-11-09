"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllDisputesAction } from "@/app/serverActions/dispute/getDisputesAction";
import { Dispute, GetAllDisputesParams } from "@/entities/dispute/types/types";


export const useGetDisputes = (params?: GetAllDisputesParams) => {
  return useQuery({
    queryKey: ["disputes", params],
    queryFn: () => getAllDisputesAction(params),
  });
};
