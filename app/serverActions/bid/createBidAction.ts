"use server";

import { CreateBidInput, Bid } from "@/entities/bid/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function createBidAction(input: CreateBidInput): Promise<Bid> {
  const supabase = supabaseServer();

  // ✅ Convert input keys to snake_case and cast back to proper type
  const payload = keysToSnake<CreateBidInput>(input);

  // 1️⃣ Check if a bid already exists
  const { data: existingBid, error: fetchError } = await supabase
    .from("bids")
    .select("*")
    .eq("request_id", payload.requestId)
    .eq("vendor_id", payload.vendorId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError;
  if (existingBid) throw new Error("A bid from this vendor for this request already exists.");

  let samplePhotosUrls: string[] = [];

  if (input.samplePhotos?.length) {
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

  // 2️⃣ Insert the bid
  const { data, error } = await supabase
    .from("bids")
    .insert([
      { 
        ...payload, 
        status: "PENDING", 
        sample_photos_urls: samplePhotosUrls, 
        created_at: new Date().toISOString() 
      }
    ])
    .select()
    .single();

  if (error) throw error;

  // Convert result to camelCase
  return keysToCamel<Bid>(data);
}
