"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateChatInput, Chat } from "@/entities/chat/types/types";
import { createChatAction } from "@/app/serverActions/chat/createChatAction";

type ContextType = {
  previousChats?: Chat[];
};

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation<Chat, Error, CreateChatInput, ContextType>({
    mutationFn: async (input) => await createChatAction(input),

    onMutate: async (newChat) => {
      await queryClient.cancelQueries({
        queryKey: ["chats", newChat.conversationId],
      });

      const previousChats =
        queryClient.getQueryData<Chat[]>(["chats", newChat.conversationId]) || [];

      const optimisticChat: Chat = {
        id: `temp-${Date.now()}`,
        conversationId: newChat.conversationId,
        senderId: newChat.senderId,
        receiverId: newChat.receiverId,
        requestId: newChat.requestId,
        content:
          typeof newChat.content === "string"
            ? newChat.content
            : URL.createObjectURL(newChat.content),
        type: newChat.type || "TEXT",
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Chat[]>(
        ["chats", newChat.conversationId],
        (old = []) => [...old, optimisticChat]
      );

      return { previousChats };
    },

    onError: (err, newChat, context) => {
      if (context?.previousChats) {
        queryClient.setQueryData(
          ["chats", newChat.conversationId],
          context.previousChats
        );
      }
      console.error("Chat send failed:", err);
    },

    onSuccess: (data, newChat) => {
      queryClient.setQueryData<Chat[]>(
        ["chats", newChat.conversationId],
        (old = []) =>
          old.map((chat) =>
            chat.id.startsWith("temp-") ? data : chat
          )
      );
    },

    onSettled: (data, error, newChat) => {
      queryClient.invalidateQueries({
        queryKey: ["chats", newChat.conversationId],
      });
    },
  });
}
