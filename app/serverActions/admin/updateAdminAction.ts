"use server";

import { UpdateAdminInput, Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";
export async function updateAdminAction(input: UpdateAdminInput): Promise<Admin> {
  const supabase = supabaseServer();
  const payload = keysToSnake(input);

  const { data, error } = await supabase
    .from("admins")
    .update(payload)
    .eq("id", input.id)
    .select()
    .single();
  if (error) throw error;
  return keysToCamel<Admin>(data);
}