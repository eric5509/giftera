"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { UpdateFeaturedListingInput, FeaturedListing } from "@/entities/featuredListing/types/types";

export const updateFeaturedListingAction = async (input: UpdateFeaturedListingInput): Promise<FeaturedListing> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("featuredListings")
    .update({
      ...input,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data as FeaturedListing;
};
