"use server";

import { Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getAdminByIdAction(id: string): Promise<Admin> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return keysToCamel<Admin>(data);
}
