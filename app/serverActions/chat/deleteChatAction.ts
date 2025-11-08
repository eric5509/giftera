"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteChatAction(id: string): Promise<{ id: string }> {
  const supabase = supabaseServer();
  const { error } = await supabase.from("chats").delete().eq("id", id);
  if (error) throw error;
  return { id };
}
