"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteTransactionAction(id: string) {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;

  return { success: true };
}
