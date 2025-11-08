import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminAction } from "@/app/serverActions/admin/updateAdminAction";
import { UpdateAdminInput, Admin } from "@/entities/admin/types/types";

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateAdminInput) => updateAdminAction(input),
    onSuccess: (updatedAdmin: Admin) => {
      queryClient.setQueryData<Admin[]>(["admins"], (old) =>
        old?.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["admins", updatedAdmin.id] });
    },
  });
};
