"use server";

import { supabaseServer } from "@/shared/lib/supabaseServer";

/**
 * Uploads a file to Supabase Storage and returns its public URL
 * @param bucket - Supabase bucket name
 * @param file - File to upload
 * @param folder - optional folder path inside bucket
 * @returns public URL string
 */
export async function uploadImageAction(
  bucket: string,
  file: File,
  folder?: string
): Promise<string> {
  const supabase = await supabaseServer();

  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const folderPath = folder ? `${folder}/` : "";
  const fileName = `${folderPath}${timestamp}.${fileExt}`;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL (no error returned)
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return data.publicUrl;
}
