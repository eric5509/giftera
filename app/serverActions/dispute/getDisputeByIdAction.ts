"use server";

import { Dispute } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const getDisputeByIdAction = async (id: string): Promise<Dispute> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
