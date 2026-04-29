import { BlogPost } from '../types';

// All blogs are managed via Supabase CMS.
// Empty array ensures no old static blogs flash before Supabase loads.
export const blogPosts: BlogPost[] = [];