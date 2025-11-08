import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChatAction } from "@/app/serverActions/chat/deleteChatAction";
import { Chat } from "@/entities/chat/types/types";

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChatAction(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
        old?.filter((c) => c.id !== id) || []
      );
      queryClient.invalidateQueries({ queryKey: ["chats", id] });
    },
  });
};
