"use server";

import { CreateSubscriptionInput } from "@/entities/subscription/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const createSubscriptionAction = async (input: CreateSubscriptionInput) => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("subscriptions")
    .insert([
      {
        ...input,
        status: "active", // default status
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
