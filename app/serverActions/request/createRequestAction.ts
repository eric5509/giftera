"use server";

import { CreateRequestInput, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";
import { keysToCamel } from "@/shared/utils/keysToCamel";
import { keysToSnake } from "@/shared/utils/keysToSnake";

export async function createRequestAction(
  input: CreateRequestInput
): Promise<Request> {
  const supabase = await supabaseServer();

  let photoUrls: string[] = [];

  if (input.photos?.length) {
    for (const file of input.photos) {
      const filePath = `requests/${input.userId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("request_photos")
        .upload(filePath, file, { upsert: false });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("request_photos")
        .getPublicUrl(uploadData.path);

      photoUrls.push(publicUrlData.publicUrl);
    }
  }

  const payload = keysToSnake({
    ...input,
    photoUrls,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("requests")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return keysToCamel<Request>(data);
}
