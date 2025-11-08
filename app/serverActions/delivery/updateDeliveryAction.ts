"use server";

import { UpdateDeliveryInput, Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateDeliveryAction(input: UpdateDeliveryInput): Promise<Delivery> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("deliveries")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
