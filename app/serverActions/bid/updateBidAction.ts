"use server";

import { UpdateBidInput, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function updateBidAction(input: UpdateBidInput): Promise<Bid> {
  const supabase = await supabaseServer();

  const payload = keysToSnake(input);

  const { data, error } = await supabase
    .from("bids")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Bid>(data);
}
