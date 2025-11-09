import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAction } from "@/app/serverActions/user/createUserAction";
import { CreateUserInput, User } from "../types/types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUserAction(input),
    onSuccess: (newUser: User) => {
      queryClient.setQueryData<User[] | undefined>(["users"], (old) =>
        old ? [newUser, ...old] : [newUser]
      );
    },
  });
};
