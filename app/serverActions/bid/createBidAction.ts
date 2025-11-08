"use server";

import { CreateBidInput, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createBidAction(input: CreateBidInput): Promise<Bid> {
  const supabase = supabaseServer();
  // 1️⃣ Check if a bid already exists for this request and vendor
  const { data: existingBid, error: fetchError } = await supabase
    .from("bids")
    .select("*")
    .eq("requestId", input.requestId)
    .eq("vendorId", input.vendorId)
    .single();
  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 = No rows found, which is fine
    throw fetchError;
  }

  if (existingBid) {
    throw new Error("A bid from this vendor for this request already exists.");
  }

  let samplePhotosUrls: string[] = [];

  if (input.samplePhotos && input.samplePhotos.length > 0) {
    for (const file of input.samplePhotos) {
      const filePath = `requests/${input.requestId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("request_photos")
        .upload(filePath, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage
        .from("request_photos")
        .getPublicUrl(uploadData.path);
      samplePhotosUrls.push(publicUrlData.publicUrl);
    }
  }

  // 2️⃣ Create a new bid
  const { data, error } = await supabase
    .from("bids")
    .insert([
      {
        ...input,
        status: "PENDING",
        samplePhotosUrls,
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
