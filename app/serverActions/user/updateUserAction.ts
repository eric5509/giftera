"use server";

import { User } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export type UpdateUserInput = Partial<Omit<User, "id" | "createdAt">> & { id: string };

export async function updateUserAction(input: UpdateUserInput): Promise<User> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("users")
    .update({ ...input, updatedAt: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
