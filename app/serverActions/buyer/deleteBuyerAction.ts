"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteBuyerAction(id: string): Promise<{ id: string }> {
  const supabase = supabaseServer();

  const { error } = await supabase.from("buyers").delete().eq("id", id);
  if (error) throw error;

  return { id };
}
