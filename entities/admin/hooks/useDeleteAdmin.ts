import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminAction } from "@/app/serverActions/admin/deleteAdminAction";
import { Admin } from "@/entities/admin/types/types";

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Admin[]>(["admins"], (old) =>
        old?.filter((a) => a.id !== id) || []
      );
      queryClient.invalidateQueries({ queryKey: ["admins", id] });
    },
  });
};
