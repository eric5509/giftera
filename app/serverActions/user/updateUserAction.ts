"use server";
import { User } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export type UpdateUserInput = Partial<Omit<User, "id" | "createdAt">> & { id: string };

export async function updateUserAction(input: UpdateUserInput): Promise<User> {
  const supabase = supabaseServer();
  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("users")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<User>(data);
}
