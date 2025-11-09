"use server";

import { Chat, GetChatsParams } from "@/entities/chat/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { camelToSnake } from "@/shared/utils/keysToSnake";

export async function getChatsAction(params: GetChatsParams = {}): Promise<Chat[]> {
  const supabase = supabaseServer();
  let query = supabase.from("chats").select("*");

  if (params.conversationId) query = query.eq("conversation_id", params.conversationId);
  if (params.senderId) query = query.eq("sender_id", params.senderId);
  if (params.receiverId) query = query.eq("receiver_id", params.receiverId);

  const sortBy = params.sortBy ? camelToSnake(params.sortBy) : "created_at";
  const sortOrder = params.sortOrder || "asc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  if (params.page && params.limit) {
    const from = (params.page - 1) * params.limit;
    const to = params.page * params.limit - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;

  // keysToCamel handles arrays, so no need for .map()
  return keysToCamel<Chat[]>(data);
}
