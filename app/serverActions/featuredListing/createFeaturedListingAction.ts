"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { FeaturedListing, CreateFeaturedListingInput } from "@/entities/featuredListing/types/types";

export const createFeaturedListingAction = async (input: CreateFeaturedListingInput): Promise<FeaturedListing> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("featuredListings")
    .insert([
      {
        ...input,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as FeaturedListing;
};

