import { useQuery } from "@tanstack/react-query";
import { GetNotificationsParams } from "../types/types";
import { getNotificationsAction } from "@/app/serverActions/notification/getNotificationsAction";

export const useGetNotifications = (params: GetNotificationsParams) =>
  useQuery<Notification[], Error>({
    queryKey: ["notifications", params],
    queryFn: () => getNotificationsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
