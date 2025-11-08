"use server";

import { Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getDeliveryByIdAction(id: string): Promise<Delivery> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("deliveries").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
