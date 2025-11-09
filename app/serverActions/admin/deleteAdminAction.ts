"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteAdminAction(id: string): Promise<{ id: string }> {
  const supabase = supabaseServer();
  const { error } = await supabase.from("admins").delete().eq("id", id);
  if (error) throw error;
  return { id };
}

