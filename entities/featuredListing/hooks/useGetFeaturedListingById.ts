"use client";
import { useQuery } from "@tanstack/react-query";
import { FeaturedListing } from "@/entities/featuredListing/types/types";
import { getFeaturedListingByIdAction } from "@/app/serverActions/featuredListing/getFeaturedListingByIdAction";

export const useGetFeaturedListingById = (id: string) => {
  return useQuery<FeaturedListing>({
    queryKey: ["featuredListing", id],
    queryFn: () => getFeaturedListingByIdAction(id),
  });
};
