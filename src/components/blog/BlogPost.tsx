import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all posts
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-gray-500">{post.author.role}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <div className="flex gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}