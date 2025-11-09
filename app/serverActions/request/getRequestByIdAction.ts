"use server";

import { Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getRequestByIdAction(id: string): Promise<Request> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<Request>(data);
}
