import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequestAction } from "@/app/serverActions/request/deleteRequestAction";
import { Request } from "@/entities/request/types/types";

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRequestAction(id),
    onSuccess: ({ id }) => {
      // Update the requests cache
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old?.filter((r) => r.id !== id) || []
      );

      // Optionally invalidate any individual request queries
      queryClient.invalidateQueries({ queryKey: ["requests", id] });
    },
  });
};
