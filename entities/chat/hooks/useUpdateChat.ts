import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChatAction } from "@/app/serverActions/chat/updateChatAction";
import { UpdateChatInput, Chat } from "@/entities/chat/types/types";

export const useUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateChatInput) => updateChatAction(input),
    onSuccess: (updatedChat: Chat) => {
      queryClient.setQueryData<Chat[]>(["chats"], (old) =>
        old?.map((c) => (c.id === updatedChat.id ? updatedChat : c)) || []
      );
      queryClient.invalidateQueries({ queryKey: ["chats", updatedChat.id] });
    },
  });
};
