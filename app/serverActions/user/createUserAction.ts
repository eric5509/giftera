"use server";
import { CreateUserInput, User } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToSnake } from "@/shared/utils/keysToSnake";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function createUserAction(input: CreateUserInput): Promise<User> {
  const supabase = supabaseServer();

  const payload = keysToSnake<Record<string, any>>(input);

  const { data, error } = await supabase
    .from("users")
    .insert([
      { ...payload, created_at: new Date().toISOString(), status: "PENDING" },
    ])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<User>(data);
}
