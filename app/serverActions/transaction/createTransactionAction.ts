"use server";
import {
  CreateTransactionPayload,
  Transaction,
  TransactionStatus,
} from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createTransactionAction(
  input: CreateTransactionPayload
): Promise<Transaction> {
  const supabase = await supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        ...payload,
        status: "pending" as TransactionStatus,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Transaction>(data);
}
