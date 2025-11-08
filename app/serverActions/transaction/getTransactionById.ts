"use server";

import { Transaction } from "@/entities/transaction/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";


export async function getTransactionByIdAction(id: string): Promise<Transaction> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
