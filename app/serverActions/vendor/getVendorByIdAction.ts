"use server";

import { Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getVendorByIdAction(id: string): Promise<Vendor> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
