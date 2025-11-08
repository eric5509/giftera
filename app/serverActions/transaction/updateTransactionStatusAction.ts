"use server";

import { TransactionStatus } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";


export async function updateTransactionStatusAction(id: string, status: TransactionStatus) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
