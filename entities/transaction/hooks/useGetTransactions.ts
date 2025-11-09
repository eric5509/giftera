// entities/transaction/model/useGetTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { getTransactionsAction } from "@/app/serverActions/transaction/getTransactionsAction";

export const useGetTransactions = (params: {
  buyerId?: string;
  vendorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactionsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 replacement
  });
};