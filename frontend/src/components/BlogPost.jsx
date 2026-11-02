import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchBlogPostBySlug } from '../lib/blogApi';
import { formatDate } from './Blog';
import { Crumbs, CtaBand } from './studio/ui';
import { nb } from '../lib/typo';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const resolvedPost = await fetchBlogPostBySlug(slug);

        if (!resolvedPost) {
          setError(true);
          setPost(null);
          return;
        }

        setPost(resolvedPost);
        setError(false);
      } catch (err) {
        console.error('Failed to resolve blog post', err);
        setError(true);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="loader" role="status" aria-label="Ładowanie artykułu">
        <span />
      </div>
    );
  }

  if (error || !post) {
    return (
      <section className="section">
        <div className="container empty">
          <h1>Nie znaleźliśmy tego artykułu</h1>
          <p className="ink-2">Mógł zostać przeniesiony albo usunięty.</p>
          <Link to="/blog" className="btn crop">
            Wróć do bloga
          </Link>
        </div>
      </section>
    );
  }

  const url = `https://visilogo.com/blog/${post.slug}`;
  const shares = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
    ['X', `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`],
  ];

  return (
    <>
      <article className="article" aria-labelledby="article-title">
        <Helmet>
          <title>{`${post.title} | VisiLogo`}</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:type" content="article" />
          <link rel="canonical" href={url} />
        </Helmet>

        <header className="article__head proof">
          <div className="container">
            <Crumbs items={[{ label: 'Blog', to: '/blog' }, { label: post.category }]} />
            <h1 id="article-title">{nb(post.title)}</h1>
            <p className="label article__meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.category}</span>
            </p>
          </div>
        </header>

        <div className="container article__grid">
          <div className="article__text">
            <p className="lead">{nb(post.excerpt)}</p>
            {String(post.content)
              .split(/\n{2,}/)
              .map((para) => (
                <p key={para.slice(0, 24)}>{nb(para)}</p>
              ))}
          </div>
          <aside className="article__aside">
            <p className="label">Udostępnij</p>
            <ul>
              {shares.map(([name, href]) => (
                <li key={name}>
                  <a className="link" href={href} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="link">
              Wszystkie artykuły
            </Link>
          </aside>
        </div>
      </article>
      <CtaBand />
    </>
  );
};

export default BlogPost;
