"use server";

import {
  SubscriptionPlan,
  UpdateSubscriptionPlanInput,
} from "@/entities/subscriptionPlan/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateSubscriptionPlanAction(
  id: string,
  input: UpdateSubscriptionPlanInput
): Promise<SubscriptionPlan> {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("subscription_plans")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<SubscriptionPlan>(data);
}
