"use server";

import { User } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export type CreateUserInput = {
  fullName: string;
  email: string;
  phone?: string;
  role: "BUYER" | "VENDOR" | "ADMIN";
  avatarUrl?: string;
};

export async function createUserAction(input: CreateUserInput): Promise<User> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("users")
    .insert([{ ...input, createdAt: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
