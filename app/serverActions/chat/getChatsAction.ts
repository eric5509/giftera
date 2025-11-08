"use server";

import { Chat, GetChatsParams } from "@/entities/chat/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function getChatsAction(params: GetChatsParams = {}): Promise<Chat[]> {
  const supabase = supabaseServer();
  let query = supabase.from("chats").select("*");

  if (params.conversationId) query = query.eq("conversationId", params.conversationId);
  if (params.senderId) query = query.eq("senderId", params.senderId);
  if (params.receiverId) query = query.eq("receiverId", params.receiverId);

  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "asc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
