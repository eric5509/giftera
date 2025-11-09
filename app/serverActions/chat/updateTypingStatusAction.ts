"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function updateTypingStatusAction(
  conversationId: string,
  userId: string,
  isTyping: boolean
) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("typing_status")
    .upsert(
      {
        conversation_id: conversationId,
        user_id: userId,
        is_typing: isTyping,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "conversation_id,user_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
}
