"use server";

import { CreateDisputeInput, Dispute } from "@/entities/dispute/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export const createDisputeAction = async (input: CreateDisputeInput): Promise<Dispute> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("disputes")
    .insert([
      {
        ...input,
        status: "OPEN",
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Dispute;
};
