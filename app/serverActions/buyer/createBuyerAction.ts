"use server";

import { Buyer } from "@/entities/buyer/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createBuyerAction(
  input: Omit<Buyer, "id" | "createdAt" | "updatedAt">
): Promise<Buyer> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("buyers")
    .insert([{ ...input, createdAt: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
