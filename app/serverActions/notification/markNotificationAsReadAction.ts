"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function markNotificationAsReadAction(id: string) {
  const supabase = await supabaseServer();

  const payload = keysToSnake({
    isRead: true,
    updatedAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("notifications")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
}
