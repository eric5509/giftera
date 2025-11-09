"use server";

import { UpdateChatInput, Chat } from "@/entities/chat/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateChatAction(input: UpdateChatInput): Promise<Chat> {
  const supabase = supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input)
  const { data, error } = await supabase
    .from("chats")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();
  if (error) throw error;
  return keysToCamel(data);
}
