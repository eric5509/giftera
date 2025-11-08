"use server";
import { CreateAdminInput, Admin } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createAdminAction(input: CreateAdminInput): Promise<Admin> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("admins")
    .insert([
      {
        ...input,
        role: input.role || "SUPER_ADMIN",
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}
