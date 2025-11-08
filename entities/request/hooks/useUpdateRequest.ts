import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateRequestInput, Request } from "@/entities/request/types/types";
import { updateRequestAction } from "@/app/serverActions/request/updateRequestAction";

export const useUpdateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateRequestInput) => updateRequestAction(input),
    onSuccess: (updatedRequest: Request) => {
      // Update the requests list in cache
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old?.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)) || []
      );
      // Invalidate the individual request query
      queryClient.invalidateQueries({ queryKey: ["requests", updatedRequest.id] });
    },
  });
};
