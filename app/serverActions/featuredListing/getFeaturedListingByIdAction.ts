"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { FeaturedListing } from "@/entities/featuredListing/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export const getFeaturedListingByIdAction = async (id: string): Promise<FeaturedListing> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("featured_listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel(data);
};
