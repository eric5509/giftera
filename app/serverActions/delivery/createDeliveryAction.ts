"use server";

import { CreateDeliveryInput, Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createDeliveryAction(input: CreateDeliveryInput): Promise<Delivery> {
  const supabase = supabaseServer();

  // Here you would call the 3rd-party delivery API and get externalDeliveryId
  // Example placeholder:
  const externalDeliveryId = "API_RETURNED_ID";
  const trackingUrl = "https://provider.com/track/API_RETURNED_ID";
  const provider = "GIG"

  const { data, error } = await supabase
    .from("deliveries")
    .insert([{
      ...input,
      externalDeliveryId,
      trackingUrl,
      provider,
      status: "PENDING",
      createdAt: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
