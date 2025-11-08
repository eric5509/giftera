"use server";

import { User, UserRole } from "@/entities/user/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

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
  if (search) query = query.or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);

  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return data;
}
