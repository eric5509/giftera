"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteRequestAction(id: string): Promise<{ id: string }> {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("requests").delete().eq("id", id);
  if (error) throw error;
  return { id };
}
