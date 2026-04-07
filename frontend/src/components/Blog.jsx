import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../lib/blogApi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const resolvedPosts = await fetchBlogPosts();
        setPosts(resolvedPosts);
      } catch (error) {
        console.error('Failed to resolve blog posts', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <section id="blog" className="py-16 lg:py-32 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-[#00FFD1] uppercase tracking-widest text-sm font-medium mb-4 block">Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Wiedza, która <br /> buduje <span className="text-gray-500">przewagę</span>
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
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {posts.map((post, index) => (
              <motion.article
                key={post._id || post.slug}
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
        ) : (
          <div className="py-20 border border-white/10 bg-white/[0.02] text-center rounded-2xl">
            <p className="text-lg text-white mb-2">Artykuły są chwilowo niedostępne.</p>
            <p className="text-gray-400">Sprawdź ponownie za chwilę lub skontaktuj się z nami bezpośrednio.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
