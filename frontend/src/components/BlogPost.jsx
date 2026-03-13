import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Calendar, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API}/blog/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00FFD1]" size={40} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400 mb-8">Artykuł nie został znaleziony.</p>
        <Link to="/" className="text-[#00FFD1] hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Wróć do strony głównej
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-black pt-24 lg:pt-32 pb-12 lg:pb-20">
      <Helmet>
        <title>{post.title} | VisiLogo</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://visilogo.com/blog/${post.slug}`} />
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00FFD1] transition-colors mb-12">
          <ArrowLeft size={16} /> Wróć
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-6 mb-8 text-sm">
            <span className="flex items-center gap-2 text-[#00FFD1] border border-[#00FFD1]/30 px-3 py-1 rounded-full bg-[#00FFD1]/5">
              <Tag size={14} /> {post.category}
            </span>
            <span className="flex items-center gap-2 text-gray-400">
              <Calendar size={14} /> {post.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-12 leading-tight text-white">
            {post.title}
          </h1>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#00FFD1]">
            <p className="lead text-xl text-gray-400 mb-8 border-l-4 border-[#00FFD1] pl-6 italic">
              {post.excerpt}
            </p>
            <div className="whitespace-pre-wrap font-sans">
              {post.content}
            </div>
          </div>
        </motion.div>
        
        <div className="mt-20 pt-10 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Udostępnij wiedzę</h3>
          <div className="flex gap-4">
            <button className="btn-secondary text-sm">LinkedIn</button>
            <button className="btn-secondary text-sm">Twitter</button>
            <button className="btn-secondary text-sm">Facebook</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
