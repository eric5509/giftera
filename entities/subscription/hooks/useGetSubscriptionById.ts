"use client";

import { getSubscriptionByIdAction } from "@/app/serverActions/subscription/getSubscriptionByIdAction";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptionById = (id?: string) => {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: () => (id ? getSubscriptionByIdAction(id) : Promise.resolve(null)),
    enabled: !!id,
  });
};
