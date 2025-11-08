import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAction } from "@/app/serverActions/user/deleteUserAction";
import { User } from "../types/types";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<User[] | undefined>(["users"], (old) =>
        old?.filter((u) => u.id !== id) || []
      );
    },
  });
};
