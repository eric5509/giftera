"use server";

import {
  CreateSubscriptionPlanInput,
  SubscriptionPlan,
} from "@/entities/subscriptionPlan/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createSubscriptionPlanAction(
  input: CreateSubscriptionPlanInput
): Promise<SubscriptionPlan> {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);
  const { data, error } = await supabase
    .from("subscription_plans")
    .insert([{ ...payload, updated_at: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return keysToCamel<SubscriptionPlan>(data);
}
