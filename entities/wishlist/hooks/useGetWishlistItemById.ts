"use client";
import { useQuery } from "@tanstack/react-query";
import { WishlistItem } from "@/entities/wishlist/types/types";
import { getWishlistItemByIdAction } from "@/app/serverActions/wishlist/getWishlistItemByIdAction";

export const useGetWishlistItemById = (id: string) => {
  return useQuery<WishlistItem>({
    queryKey: ["wishlistItem", id],
    queryFn: () => getWishlistItemByIdAction(id),
  });
};
