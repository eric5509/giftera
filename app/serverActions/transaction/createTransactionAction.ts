"use server";
import { CreateTransactionPayload, Transaction, TransactionStatus } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createTransactionAction(payload: CreateTransactionPayload): Promise<Transaction> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        ...payload,
        status: "pending" as TransactionStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
