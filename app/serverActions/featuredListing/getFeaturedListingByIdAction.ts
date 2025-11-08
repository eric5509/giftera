"use server";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { FeaturedListing } from "@/entities/featuredListing/types/types";

export const getFeaturedListingByIdAction = async (id: string): Promise<FeaturedListing> => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("featuredListings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as FeaturedListing;
};
