"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import {
  UpdateFeaturedListingInput,
  FeaturedListing,
} from "@/entities/featuredListing/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const updateFeaturedListingAction = async (
  input: UpdateFeaturedListingInput
): Promise<FeaturedListing> => {
  const supabase = await supabaseServer();
  const payload = keysToSnake({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("featured_listings")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
