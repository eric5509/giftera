"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export const deleteDisputeAction = async (id: string) => {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("disputes").delete().eq("id", id);

  if (error) throw error;

  return { success: true, message: "Dispute deleted successfully" };
};
