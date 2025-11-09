"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createBuyerAction(
  input: Omit<Buyer, "id" | "createdAt" | "updatedAt">
): Promise<Buyer> {
  const supabase = supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("buyers")
    .insert([{ ...payload, created_at: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return keysToCamel<Buyer>(data);
}
