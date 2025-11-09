"use server";
import { CreateAdminInput, Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";
export async function createAdminAction(
  input: CreateAdminInput
): Promise<Admin> {
  const supabase = await supabaseServer();
  const payload = keysToSnake({
    ...input,
    role: input.role || "SUPER_ADMIN",
    createdAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("admins")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Admin>(data);
}
