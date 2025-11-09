"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateBuyerAction(
  input: Partial<Buyer> & { id: string }
): Promise<Buyer> {
  const supabase = supabaseServer();

  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("buyers")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();
  if (error) throw error;
  return keysToCamel(<Buyer>data);
}
