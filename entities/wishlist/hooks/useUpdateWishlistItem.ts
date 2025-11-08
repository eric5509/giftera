"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateWishlistItemInput, WishlistItem } from "@/entities/wishlist/types/types";
import { updateWishlistItemAction } from "@/app/serverActions/wishlist/updateWishlistItemAction";

export const useUpdateWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation<WishlistItem, unknown, UpdateWishlistItemInput>({
    mutationFn: (input) => updateWishlistItemAction(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlistItems"] }),
  });
};
