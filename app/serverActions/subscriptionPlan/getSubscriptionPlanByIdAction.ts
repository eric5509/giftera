"use server";

import { SubscriptionPlan } from "@/entities/subscriptionPlan/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getSubscriptionPlanByIdAction(
  id: string
): Promise<SubscriptionPlan> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<SubscriptionPlan>(data);
}
