import { Admin, GetAdminsParams } from "@/entities/admin/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";

export async function getAdminsAction(params: GetAdminsParams = {}): Promise<Admin[]> {
  const supabase = supabaseServer();
  let query = supabase.from("admins").select("*");

  if (params.role) query = query.eq("role", params.role);

  const sortBy = params.sortBy || "created_at";
  const sortOrder = params.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;

  return keysToCamel<Admin[]>(data); // converts array and all objects inside
}
