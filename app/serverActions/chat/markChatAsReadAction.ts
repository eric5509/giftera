"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function markChatAsReadAction(conversationId: string, userId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("chats")
    .update({
      isRead: true,
      updatedAt: new Date().toISOString(),
    })
    .eq("conversationId", conversationId)
    .eq("receiverId", userId)
    .select();

  if (error) throw error;
  return data;
}
