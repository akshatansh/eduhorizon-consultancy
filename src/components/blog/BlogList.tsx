import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blogPosts';
import { createClient } from '@supabase/supabase-js';
import { mapDbBlogPostToUi, type DbBlogPostRow } from '../../utils/cmsMappers';
import type { BlogPost } from '../../types';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
    if (isPrerender) return;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const run = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(
          'slug,title,excerpt,content_html,cover_image_url,category,tags,author_name,author_role,author_avatar_url,read_time,published,published_at,created_at,updated_at'
        )
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error || !data) return;
      setPosts((data as DbBlogPostRow[]).map(mapDbBlogPostToUi));
    };

    run();
  }, []);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h1>
          <p className="text-xl text-gray-600">
            Expert advice and guidance for your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}