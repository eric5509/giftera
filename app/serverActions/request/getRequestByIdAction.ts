"use server";

import { Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getRequestByIdAction(id: string): Promise<Request> {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("requests").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
