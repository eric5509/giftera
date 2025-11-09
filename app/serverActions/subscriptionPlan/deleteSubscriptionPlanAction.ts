"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function deleteSubscriptionPlanAction(id: string): Promise<boolean> {
  const supabase = supabaseServer();

  const { error } = await supabase.from("subscription_plans").delete().eq("id", id);

  if (error) throw error;
  return true;
}
