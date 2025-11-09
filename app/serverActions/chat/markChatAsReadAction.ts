"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { Chat } from "@/entities/chat/types/types";

export async function markChatAsReadAction(
  conversationId: string,
  userId: string
): Promise<Chat[]> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("chats")
    .update({
      is_read: true,
      updated_at: new Date().toISOString(),
    })
    .eq("conversation_id", conversationId)
    .eq("receiver_id", userId)
    .select();

  if (error) throw error;

  return keysToCamel<Chat[]>(data);
}
