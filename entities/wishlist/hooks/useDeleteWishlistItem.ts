"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlistItemAction } from "@/app/serverActions/wishlist/deleteWishlistItemAction";

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWishlistItemAction(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlistItems"] }),
  });
};
