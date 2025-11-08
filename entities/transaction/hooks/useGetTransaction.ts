import { getTransactionByIdAction } from "@/app/serverActions/transaction/getTransactionById";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../types/types";

export const useGetTransaction = (id: string) => {
  return useQuery<Transaction, Error>({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionByIdAction(id),
    enabled: !!id, // only fetch if id exists
  });
};
