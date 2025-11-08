"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteVendorAction(id: string): Promise<{ id: string }> {
  const supabase = supabaseServer();

  const { error } = await supabase.from("vendors").delete().eq("id", id);

  if (error) throw error;
  return { id };
}
