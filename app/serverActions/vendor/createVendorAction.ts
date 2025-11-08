"use server";

import { CreateVendorInput, Vendor } from "@/entities/vendor/types/vendor";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createVendorAction(input: CreateVendorInput): Promise<Vendor> {
  const supabase = supabaseServer();

  let logoUrl = "";

  if (input.logo) {
    const filePath = `vendor_logos/${input.userId}/${Date.now()}_${input.logo.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("vendor_logos")
      .upload(filePath, input.logo, { upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("vendor_logos")
      .getPublicUrl(uploadData.path);
    logoUrl = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("vendors")
    .insert([
      {
        userId: input.userId,
        businessName: input.businessName,
        businessType: input.businessType,
        address: input.address,
        verified: false,
        logoUrl,
        subscriptionPlan: input.subscriptionPlan || "FREE",
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
