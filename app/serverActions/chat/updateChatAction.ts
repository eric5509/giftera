"use server";

import { UpdateChatInput, Chat } from "@/entities/chat/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateChatAction(input: UpdateChatInput): Promise<Chat> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("chats")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
