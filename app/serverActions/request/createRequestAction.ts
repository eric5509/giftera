"use server";

import { CreateRequestInput, Request } from "@/entities/request/types/types";
import { supabaseServer } from "@/shared/lib/supabaseServer";

export async function createRequestAction(
  input: CreateRequestInput
): Promise<Request> {
  const supabase = supabaseServer();

  let photoUrls: string[] = [];

  if (input.photos && input.photos.length > 0) {
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

  const { data, error } = await supabase
    .from("requests")
    .insert([
      {
        userId: input.userId,
        title: input.title,
        description: input.description,
        photoUrls,
        deliveryTime: input.deliveryTime,
        location: input.location,
        status: "OPEN",
        createdAt: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Request;
}
