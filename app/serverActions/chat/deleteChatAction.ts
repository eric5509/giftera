"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteChatAction(id: string, userId: string): Promise<{ id: string }> {
  const supabase = supabaseServer();

  // 1️⃣ Verify that the chat exists and the user is the sender
  const { data: chat, error: fetchError } = await supabase
    .from("chats")
    .select("sender_id")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  if (!chat) throw new Error("Chat not found.");
  if (chat.sender_id !== userId) throw new Error("You are not allowed to delete this chat.");

  // 2️⃣ Perform deletion
  const { error: deleteError } = await supabase
    .from("chats")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  return { id };
}
