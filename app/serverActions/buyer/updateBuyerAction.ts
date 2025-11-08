"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateBuyerAction(input: Partial<Buyer> & { id: string }): Promise<Buyer> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("buyers")
    .update({ ...input, updatedAt: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
