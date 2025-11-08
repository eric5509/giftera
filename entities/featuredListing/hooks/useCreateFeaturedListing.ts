"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFeaturedListingInput, FeaturedListing } from "@/entities/featuredListing/types/types";
import { createFeaturedListingAction } from "@/app/serverActions/featuredListing/createFeaturedListingAction";

export const useCreateFeaturedListing = () => {
  const queryClient = useQueryClient();
  return useMutation<FeaturedListing, unknown, CreateFeaturedListingInput>({
    mutationFn: (input) => createFeaturedListingAction(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featuredListings"] }),
  });
};
