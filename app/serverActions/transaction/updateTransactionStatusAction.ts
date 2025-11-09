"use server";
import { TransactionStatus, Transaction } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function updateTransactionStatusAction(id: string, status: TransactionStatus): Promise<Transaction> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Transaction>(data);
}
