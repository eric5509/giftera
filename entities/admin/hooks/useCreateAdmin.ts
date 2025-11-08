import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminAction } from "@/app/serverActions/admin/createAdminAction";
import { CreateAdminInput, Admin } from "@/entities/admin/types/types";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAdminInput) => createAdminAction(input),
    onSuccess: (newAdmin: Admin) => {
      queryClient.setQueryData<Admin[]>(["admins"], (old) => (old ? [newAdmin, ...old] : [newAdmin]));
    },
  });
};
