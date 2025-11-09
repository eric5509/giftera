"use server";

import { UpdateDeliveryInput, Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateDeliveryAction(input: UpdateDeliveryInput): Promise<Delivery> {
  const supabase = supabaseServer();
const payload = keysToSnake(input); // ✅ fine, no need for Partial

  const { data, error } = await supabase
    .from("deliveries")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Delivery>(data);
}
