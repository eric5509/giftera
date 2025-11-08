import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNotificationInput, Notification } from "../types/types";
import { createNotificationAction} from "@/app/serverActions/notification/createNotification";

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateNotificationInput) =>
      createNotificationAction(input),
    onSuccess: (newNotification: Notification) => {
      // Optionally prepend to notifications cache
      queryClient.setQueryData<Notification[] | undefined>(
        ["notifications"],
        (old) => (old ? [newNotification, ...old] : [newNotification])
      );
    },
  });
};
