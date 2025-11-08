import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markChatAsReadAction } from "@/app/serverActions/chat/markChatAsReadAction";

// ✅ Mark messages as read
export const useMarkChatAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => markChatAsReadAction(conversationId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chats", variables.conversationId],
      });
    },
  });
};
