"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import {
  FeaturedListing,
  CreateFeaturedListingInput,
} from "@/entities/featuredListing/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export const createFeaturedListingAction = async (
  input: CreateFeaturedListingInput
): Promise<FeaturedListing> => {
  const supabase = await supabaseServer();

  const payload = keysToSnake({
    ...input,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("featured_listings")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
