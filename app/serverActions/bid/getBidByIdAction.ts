"use server";

import { Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getBidByIdAction(id: string): Promise<Bid> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("bids")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return keysToCamel<Bid>(data);
}
