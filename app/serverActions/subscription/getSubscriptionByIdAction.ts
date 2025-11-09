"use server";

import { Subscription } from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const getSubscriptionByIdAction = async (
  id: string
): Promise<Subscription> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<Subscription>(data);
};
