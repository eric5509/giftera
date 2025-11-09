"use server";
import { UpdateVendorInput, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function updateVendorAction(
  input: UpdateVendorInput
): Promise<Vendor> {
  const supabase = await supabaseServer();

  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("vendors")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Vendor>(data);
}
