"use server";

import {
  CreateSubscriptionInput,
  Subscription,
} from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const createSubscriptionAction = async (
  input: CreateSubscriptionInput
): Promise<Subscription> => {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("subscriptions")
    .insert([
      {
        ...payload,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Subscription>(data);
};
