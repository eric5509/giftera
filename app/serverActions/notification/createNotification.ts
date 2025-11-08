"use server";
import { CreateNotificationInput } from "@/entities/notification/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createNotificationAction(input: CreateNotificationInput) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        ...input,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
