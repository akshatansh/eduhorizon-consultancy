import type { SupabaseClient } from '@supabase/supabase-js';

function getExt(filename: string) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : 'bin';
}

export async function uploadPublicImage(params: {
  supabase: SupabaseClient;
  bucket: 'blog-images' | 'college-images';
  file: File;
  pathPrefix: string;
}) {
  const { supabase, bucket, file, pathPrefix } = params;
  const ext = getExt(file.name);
  const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

