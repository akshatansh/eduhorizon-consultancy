-- Add storage policies for college-images and blog-images buckets
-- This allows public access to uploaded images

-- Ensure buckets are public
update storage.buckets set public = true where id = 'college-images';
update storage.buckets set public = true where id = 'blog-images';

-- Public read access for college images
drop policy if exists "Public access to college-images" on storage.objects;
create policy "Public access to college-images"
  on storage.objects
  for select
  using (bucket_id = 'college-images');

drop policy if exists "Auth can upload college-images" on storage.objects;
create policy "Auth can upload college-images"
  on storage.objects
  for insert
  with check (bucket_id = 'college-images' and auth.role() = 'authenticated');

drop policy if exists "Auth can update college-images" on storage.objects;
create policy "Auth can update college-images"
  on storage.objects
  for update
  using (bucket_id = 'college-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'college-images');

drop policy if exists "Auth can delete college-images" on storage.objects;
create policy "Auth can delete college-images"
  on storage.objects
  for delete
  using (bucket_id = 'college-images' and auth.role() = 'authenticated');

-- Public read access for blog images
drop policy if exists "Public access to blog-images" on storage.objects;
create policy "Public access to blog-images"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');

drop policy if exists "Auth can upload blog-images" on storage.objects;
create policy "Auth can upload blog-images"
  on storage.objects
  for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "Auth can update blog-images" on storage.objects;
create policy "Auth can update blog-images"
  on storage.objects
  for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'blog-images');

drop policy if exists "Auth can delete blog-images" on storage.objects;
create policy "Auth can delete blog-images"
  on storage.objects
  for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');