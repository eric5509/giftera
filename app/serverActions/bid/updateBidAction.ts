"use server";

import { UpdateBidInput, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateBidAction(input: UpdateBidInput): Promise<Bid> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("bids")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
