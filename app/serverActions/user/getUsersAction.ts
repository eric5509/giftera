"use server";
import { User, UserRole } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export type GetUsersParams = {
  role?: UserRole;
  search?: string;           // search by name or email
  sortBy?: keyof User;       // e.g., "fullName", "createdAt"
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export async function getUsersAction(params?: GetUsersParams): Promise<User[]> {
  const supabase = supabaseServer();
  const { role, search, sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 10 } = params || {};

  let query = supabase.from("users").select("*");

  if (role) query = query.eq("role", role);
  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);

  const sortBySnake = camelToSnake(sortBy as string);
  query = query.order(sortBySnake, { ascending: sortOrder === "asc" });

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw error;
  return keysToCamel<User[]>(data);
}
