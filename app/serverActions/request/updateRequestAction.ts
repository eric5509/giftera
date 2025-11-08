"use server";

import { UpdateRequestInput, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateRequestAction(input: UpdateRequestInput): Promise<Request> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("requests")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
