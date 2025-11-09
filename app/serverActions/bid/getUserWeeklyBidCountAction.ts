"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getUserWeeklyBidCountAction(
  userId: string
): Promise<number> {
  const supabase = await supabaseServer();
  // Get current date
  const today = new Date();
  // Calculate start (Sunday) and end (Saturday) of the current week
  const dayOfWeek = today.getDay(); // Sunday = 0
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Query Supabase
  const { count, error } = await supabase
    .from("bids")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfWeek.toISOString())
    .lte("created_at", endOfWeek.toISOString());

  if (error) throw error;

  return count ?? 0;
}
