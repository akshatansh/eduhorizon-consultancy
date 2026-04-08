import type { BlogPost } from '../types';
import type { College } from '../types/college';

export type DbBlogPostRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  author_name: string | null;
  author_role: string | null;
  author_avatar_url: string | null;
  read_time: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const DEFAULT_BLOG_COVER =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80';
const DEFAULT_AUTHOR_AVATAR =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80';

function normalizePublicImageUrl(raw: string | null | undefined, bucket: 'blog-images'): string {
  const value = (raw || '').trim();
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('blob:')) {
    return value;
  }
  if (value.startsWith('/')) return value;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!supabaseUrl) return value;

  // Support values saved as:
  // - blogs/uuid.png
  // - avatars/uuid.png
  // - blog-images/blogs/uuid.png
  const cleaned = value.startsWith(`${bucket}/`) ? value.slice(bucket.length + 1) : value;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleaned}`;
}

export function mapDbBlogPostToUi(row: DbBlogPostRow): BlogPost {
  const date = row.published_at || row.created_at;
  const image = normalizePublicImageUrl(row.cover_image_url, 'blog-images') || DEFAULT_BLOG_COVER;
  const avatar = normalizePublicImageUrl(row.author_avatar_url, 'blog-images') || DEFAULT_AUTHOR_AVATAR;

  return {
    id: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: row.category || 'General',
    tags: row.tags || [],
    image,
    author: {
      name: row.author_name || 'EduHorizon',
      avatar,
      role: row.author_role || 'Counselor'
    },
    date,
    readTime: row.read_time || '5 min read',
    contentHtml: row.content_html,
    published: row.published
  };
}

export type DbCollegeRow = {
  slug: string;
  name: string;
  location: string;
  courses: string[] | null;
  images: string[] | null;
  description: string | null;
  fees: string | null;
  website: string | null;
  established: string | null;
  ranking: string | null;
  facilities: string[] | null;
  highlights: string[] | null;
};

export function mapDbCollegeToUi(row: DbCollegeRow): College {
  return {
    id: row.slug,
    name: row.name,
    location: row.location as College['location'],
    courses: row.courses || [],
    images: row.images || [],
    description: row.description || '',
    fees: row.fees || '',
    website: row.website || '',
    established: row.established || '',
    ranking: row.ranking || undefined,
    facilities: row.facilities || [],
    highlights: row.highlights || []
  };
}

