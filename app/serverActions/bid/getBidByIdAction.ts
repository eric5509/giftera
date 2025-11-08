"use server";

import { Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getBidByIdAction(id: string): Promise<Bid> {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("bids").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
