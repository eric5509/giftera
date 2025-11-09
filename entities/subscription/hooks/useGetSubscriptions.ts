"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllSubscriptionsParams, Subscription } from "@/entities/subscription/types/types";
import { getAllSubscriptionsAction } from "@/app/serverActions/subscription/getSubscriptionsAction";


export const useGetSubscriptions = (params?: GetAllSubscriptionsParams) => {
  return useQuery({
    queryKey: ["subscriptions", params],
    queryFn: () => getAllSubscriptionsAction(params),
  });
};
