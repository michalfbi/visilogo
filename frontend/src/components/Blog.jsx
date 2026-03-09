import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API}/blog`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch blog posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-32 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-[#00FFD1] uppercase tracking-widest text-sm font-medium mb-4 block">Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Wiedza, która <br/> buduje <span className="text-gray-500">przewagę</span>
            </h2>
          </div>
          <Link to="/blog" className="text-white hover:text-[#00FFD1] transition-colors flex items-center gap-2 pb-2 border-b border-white/20 hover:border-[#00FFD1]">
            Zobacz wszystkie artykuły <ArrowUpRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#00FFD1]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {posts.map((post, index) => (
              <motion.article 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <span className="text-[#00FFD1] font-mono">{post.category}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#00FFD1] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white group-hover:translate-x-2 transition-transform duration-300">
                    Czytaj dalej <ArrowUpRight size={16} className="text-[#00FFD1]" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
