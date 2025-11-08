"use server";

import { Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getAdminByIdAction(id: string): Promise<Admin> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("admins").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
