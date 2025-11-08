import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTypingStatusAction } from "@/app/serverActions/chat/updateTypingStatusAction";

export const useUpdateTypingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
      isTyping,
    }: {
      conversationId: string;
      userId: string;
      isTyping: boolean;
    }) => updateTypingStatusAction(conversationId, userId, isTyping),
    onSuccess: (data) => {
      queryClient.setQueryData(["typing_status", data.conversation_id], data);
    },
  });
};
