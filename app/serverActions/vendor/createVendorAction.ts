"use server";

import { CreateVendorInput, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createVendorAction(
  input: CreateVendorInput
): Promise<Vendor> {
  const supabase = await supabaseServer();
  let logoUrl = "";

  // Handle File upload for logo
  if (input.logo instanceof File) {
    const filePath = `vendor_logos/${input.userId}/${Date.now()}_${
      input.logo.name
    }`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("vendor_logos")
      .upload(filePath, input.logo, { upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("vendor_logos")
      .getPublicUrl(uploadData.path);
    logoUrl = publicUrlData.publicUrl;
  } else if (typeof input.logo === "string") {
    logoUrl = input.logo;
  }

  // Prepare payload
  const payload = keysToSnake<Record<string, any>>({
    ...input,
    logoUrl,
    verified: false,
    subscriptionPlan: input.subscriptionPlanId || "FREE",
    createdAt: new Date().toISOString(),
  });

  // Insert vendor
  const { data, error } = await supabase
    .from("vendors")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Vendor>(data);
}
