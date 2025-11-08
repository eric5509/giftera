import { markNotificationAsReadAction } from "@/app/serverActions/notification/markNotificationAsReadAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsReadAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
