"use server ";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const deleteSubscriptionAction = async (id: string) => {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);
  if (error) throw error;
  return { success: true, message: "Subscription deleted successfully" };
};
