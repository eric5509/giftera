import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAction, UpdateUserInput } from "@/app/serverActions/user/updateUserAction";
import { User } from "../types/types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUserAction(input),
    onSuccess: (updated: User) => {
      queryClient.setQueryData<User[] | undefined>(["users"], (old) =>
        old?.map((u) => (u.id === updated.id ? updated : u)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["users", updated.id] });
    },
  });
};
