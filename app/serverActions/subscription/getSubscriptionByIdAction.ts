"use server";

import { Subscription } from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const getSubscriptionByIdAction = async (id: string) => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Subscription;
};
