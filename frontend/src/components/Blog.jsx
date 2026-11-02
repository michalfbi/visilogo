import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../lib/blogApi';
import { CtaBand, PageHead } from './studio/ui';
import { nb } from '../lib/typo';

export const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

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
    <>
      <PageHead
        crumbs={[{ label: 'Blog' }]}
        title="Wiedza, która buduje przewagę"
        lead="Artykuły o brandingu, stronach WWW i kampaniach B2B. Bez ogólników, z przykładami z naszej pracy."
      />

      <section id="blog" className="section section--s" aria-label="Artykuły">
        <div className="container">
          {loading ? (
            <div className="loader" role="status" aria-label="Ładowanie artykułów">
              <span />
            </div>
          ) : posts.length > 0 ? (
            <ol className="posts">
              {posts.map((post, index) => (
                <li key={post._id || post.slug} className={index === 0 ? 'post post--lead' : 'post'}>
                  <Link to={`/blog/${post.slug}`} className="post__link">
                    <span className="post__meta label">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.category}</span>
                    </span>
                    <span className="post__body">
                      <h2>{nb(post.title)}</h2>
                      <p>{nb(post.excerpt)}</p>
                    </span>
                    <ArrowUpRight className="post__arrow" size={22} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty">
              <h2>Artykuły są chwilowo niedostępne</h2>
              <p className="ink-2">Sprawdź ponownie za chwilę lub skontaktuj się z nami bezpośrednio.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
};

export default Blog;
