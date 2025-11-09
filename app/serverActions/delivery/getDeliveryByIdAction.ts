"use server";

import { Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getDeliveryByIdAction(id: string): Promise<Delivery> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("deliveries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<Delivery>(data);
}
