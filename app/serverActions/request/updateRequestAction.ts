"use server";

import { UpdateRequestInput, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateRequestAction(
  input: UpdateRequestInput
): Promise<Request> {
  const supabase = await supabaseServer();

  const payload = keysToSnake(input);

  const { data, error } = await supabase
    .from("requests")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Request>(data);
}
