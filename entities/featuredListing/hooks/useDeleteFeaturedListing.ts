"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeaturedListingAction } from "@/app/serverActions/featuredListing/deleteFeaturedListingAction";

export const useDeleteFeaturedListing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFeaturedListingAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featuredListings"] }),
  });
};
