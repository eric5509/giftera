"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";
import { Chat, ChatType } from "@/entities/chat/types/types";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export type CreateChatInput = {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string | File;
  type?: ChatType; 
};

export async function createChatAction(input: CreateChatInput): Promise<Chat> {
  const supabase = supabaseServer();
  let contentUrl = "";
  let chatType: ChatType = input.type || "TEXT";

  // 🖼️ Upload image if content is a File
  if (input.content instanceof File) {
    const file = input.content;
    const filePath = `chat_uploads/${input.conversationId}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("chat_media")
      .upload(filePath, file, { upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("chat_media")
      .getPublicUrl(uploadData.path);
    contentUrl = publicUrlData.publicUrl;
    chatType = "IMAGE";
  } else {
    contentUrl = input.content;
  }

  // 💾 Convert input to snake_case before inserting
  const payload = keysToSnake({
    ...input,
    content: contentUrl,
    type: chatType,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("chats")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;

  // ✅ Convert returned data to camelCase
  return keysToCamel<Chat>(data);
}
