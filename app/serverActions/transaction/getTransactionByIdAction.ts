"use server";
import { Transaction } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getTransactionByIdAction(
  id: string
): Promise<Transaction> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return keysToCamel<Transaction>(data);
}
