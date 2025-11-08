"use server";

import { CreateVendorKYCInput, VendorKYC } from "@/entities/vendorKYC/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createVendorKYCAction(input: CreateVendorKYCInput): Promise<VendorKYC> {
  const supabase = supabaseServer();

  if (!input.idImage || !input.selfie || !input.businessCertificate) {
    throw new Error("Please submit all required images");
  }
  // Upload helper
  const uploadFile = async (file: File, folder: string) => {
    const filePath = `${folder}/${input.vendorId}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(folder)
      .upload(filePath, file, { upsert: false });
    if (uploadError) throw uploadError;
    const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(uploadData.path);
    return publicUrlData.publicUrl;
  };

  const idImageUrl = await uploadFile(input.idImage, "vendor_kyc");
  const selfieUrl = await uploadFile(input.selfie, "vendor_kyc");
  const businessCertificateUrl = await uploadFile(input.businessCertificate, "vendor_kyc");

  const { data, error } = await supabase
    .from("vendor_kyc")
    .insert([
      {
        vendorId: input.vendorId,
        status: "PENDING",
        idImageUrl,
        selfieUrl,
        businessCertificateUrl,
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
