"use server";

import { UpdateDisputeInput, Dispute } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const updateDisputeAction = async (id: string, input: UpdateDisputeInput): Promise<Dispute> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("disputes")
    .update({
      ...input,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Dispute;
};
