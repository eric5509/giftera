"use client";
import { useQuery } from "@tanstack/react-query";
import { FeaturedListing, GetAllFeaturedListingsParams } from "@/entities/featuredListing/types/types";
import { getAllFeaturedListingsAction,  } from "@/app/serverActions/featuredListing/getFeaturedListingsAction";

export const useGetFeaturedListings = (params?: GetAllFeaturedListingsParams) => {
  return useQuery<FeaturedListing[]>({
    queryKey: ["featuredListings", params],
    queryFn: () => getAllFeaturedListingsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
};
