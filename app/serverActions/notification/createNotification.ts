"use server";

import { CreateNotificationInput } from "@/entities/notification/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createNotificationAction(input: CreateNotificationInput) {
  const supabase = supabaseServer();

  const payload = keysToSnake({
    ...input,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("notifications")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
}
