"use server";

import {
  Subscription,
  UpdateSubscriptionInput,
} from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const updateSubscriptionAction = async (
  id: string,
  input: UpdateSubscriptionInput
): Promise<Subscription> => {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("subscriptions")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Subscription>(data);
};
