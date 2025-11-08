"use server";

import { UpdateVendorInput, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateVendorAction(input: UpdateVendorInput): Promise<Vendor> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("vendors")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
