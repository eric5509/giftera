"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";


export async function markNotificationAsReadAction(id: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("notifications")
    .update({ isRead: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
