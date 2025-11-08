"use server";

import { UpdateAdminInput, Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function updateAdminAction(input: UpdateAdminInput): Promise<Admin> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("admins")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
