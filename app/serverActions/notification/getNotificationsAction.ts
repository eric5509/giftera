"use server";

import { GetNotificationsParams } from "@/entities/notification/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";


export async function getNotificationsAction(params: GetNotificationsParams): Promise<Notification[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("userId", params.userId)
    .order("createdAt", { ascending: false })
    .range(
      ((params.page || 1) - 1) * (params.limit || 10),
      (params.page || 1) * (params.limit || 10) - 1
    );
  if (error) throw error;
  return data;
}