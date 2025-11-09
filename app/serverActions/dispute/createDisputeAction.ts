"use server";

import { CreateDisputeInput, Dispute } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const createDisputeAction = async (input: CreateDisputeInput): Promise<Dispute> => {
  const supabase = supabaseServer();
  const payload = keysToSnake({ ...input, status: "OPEN", createdAt: new Date().toISOString() });

  const { data, error } = await supabase
    .from("disputes")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
