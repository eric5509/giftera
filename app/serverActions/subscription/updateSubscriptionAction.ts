"use server";

import { Subscription, UpdateSubscriptionInput } from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const updateSubscriptionAction = async (id: string, input: UpdateSubscriptionInput) => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("subscriptions")
    .update({
      ...input,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Subscription;
};
