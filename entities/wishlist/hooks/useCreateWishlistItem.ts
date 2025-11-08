"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWishlistItemInput, WishlistItem } from "@/entities/wishlist/types/types";
import { createWishlistItemAction } from "@/app/serverActions/wishlist/createWishlistItemAction";

export const useCreateWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation<WishlistItem, unknown, CreateWishlistItemInput>({
    mutationFn: (input) => createWishlistItemAction(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlistItems"] }),
  });
};
