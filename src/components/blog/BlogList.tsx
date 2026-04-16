import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts } from '../../data/blogPosts';
import { createClient } from '@supabase/supabase-js';
import { mapDbBlogPostToUi, type DbBlogPostRow } from '../../utils/cmsMappers';
import type { BlogPost } from '../../types';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
    if (isPrerender) {
      setPosts(blogPosts);
      setIsLoading(false);
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      setPosts(blogPosts);
      setIsLoading(false);
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const run = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(
            'slug,title,excerpt,content_html,cover_image_url,category,tags,author_name,author_role,author_avatar_url,read_time,published,published_at,created_at,updated_at'
          )
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error || !data) {
          setPosts(blogPosts);
          return;
        }

        setPosts((data as DbBlogPostRow[]).map(mapDbBlogPostToUi));
      } catch {
        setPosts(blogPosts);
      } finally {
        setIsLoading(false);
      }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admission & Career Guidance Blog for Noida and Greater Noida
          </h1>
          <p className="text-xl text-gray-600">
            Expert articles on college admissions, branch selection, fees, placements and career planning.
          </p>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-gray-600">
            Explore related resources:
            <Link to="/colleges" className="ml-2 font-medium text-blue-700 hover:text-blue-800 hover:underline">
              Top Colleges
            </Link>
            <span className="mx-2 text-gray-300">|</span>
            <Link to="/success-stories" className="font-medium text-blue-700 hover:text-blue-800 hover:underline">
              Success Stories
            </Link>
            <span className="mx-2 text-gray-300">|</span>
            <Link to="/testimonials" className="font-medium text-blue-700 hover:text-blue-800 hover:underline">
              Student Testimonials
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : posts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}
        </div>
      </div>
    </div>
  );
}