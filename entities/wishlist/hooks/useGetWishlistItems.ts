"use client";
import { useQuery } from "@tanstack/react-query";
import {
  GetWishlistItemsParams,
  WishlistItem,
} from "@/entities/wishlist/types/types";
import { getAllWishlistItemsAction } from "@/app/serverActions/wishlist/getAllWishlistItemsAction";

export const useGetWishlistItems = (params?: GetWishlistItemsParams) => {
  return useQuery<WishlistItem[]>({
    queryKey: ["wishlistItems", params],
    queryFn: () => getAllWishlistItemsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
};
