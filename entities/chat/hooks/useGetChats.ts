import { useQuery } from "@tanstack/react-query";
import { getChatsAction } from "@/app/serverActions/chat/getChatsAction";
import { Chat, GetChatsParams } from "@/entities/chat/types/types";

export const useGetChats = (params: GetChatsParams = {}, previousData?: Chat[]) =>
  useQuery<Chat[], Error>({
    queryKey: ["chats", params],
    queryFn: () => getChatsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 pattern for smooth pagination
  });
