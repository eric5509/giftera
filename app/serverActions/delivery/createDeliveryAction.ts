"use server";

import { CreateDeliveryInput, Delivery } from "@/entities/delivery/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createDeliveryAction(
  input: CreateDeliveryInput
): Promise<Delivery> {
  const supabase = await supabaseServer();

  // Example integration with external delivery API
  const externalDeliveryId = "API_RETURNED_ID";
  const trackingUrl = "https://provider.com/track/API_RETURNED_ID";
  const provider = "GIG";

  const payload = keysToSnake({
    ...input,
    externalDeliveryId,
    trackingUrl,
    provider,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("deliveries")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Delivery>(data);
}
