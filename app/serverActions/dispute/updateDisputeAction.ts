"use server";

import { UpdateDisputeInput, Dispute } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const updateDisputeAction = async (id: string, input: UpdateDisputeInput): Promise<Dispute> => {
  const supabase = supabaseServer();
  const payload = keysToSnake({ ...input, updatedAt: new Date().toISOString() });

  const { data, error } = await supabase
    .from("disputes")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
