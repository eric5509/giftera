"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateFeaturedListingInput, FeaturedListing } from "@/entities/featuredListing/types/types";
import { updateFeaturedListingAction } from "@/app/serverActions/featuredListing/updateFeaturedListingAction";

export const useUpdateFeaturedListing = () => {
  const queryClient = useQueryClient();
  return useMutation<FeaturedListing, unknown, UpdateFeaturedListingInput>({
    mutationFn: (input) => updateFeaturedListingAction(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featuredListings"] }),
  });
};
