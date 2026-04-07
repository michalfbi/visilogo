import axios from 'axios';
import { fallbackBlogPosts, getFallbackBlogPostBySlug } from '../data/blogPosts';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getApiCandidates = () => {
  const candidates = [];
  const envBase = process.env.REACT_APP_BACKEND_URL?.trim();

  if (envBase) {
    candidates.push(`${trimTrailingSlash(envBase)}/api`);
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    candidates.push(`${trimTrailingSlash(window.location.origin)}/api`);
  }

  if (process.env.NODE_ENV === 'development') {
    candidates.push('http://localhost:8000/api');
  }

  return [...new Set(candidates)];
};

export const fetchBlogPosts = async () => {
  const candidates = getApiCandidates();

  for (const apiBase of candidates) {
    try {
      const response = await axios.get(`${apiBase}/blog`, { timeout: 6000 });
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.warn(`Blog API unavailable for ${apiBase}`, error);
    }
  }

  return fallbackBlogPosts;
};

export const fetchBlogPostBySlug = async (slug) => {
  const candidates = getApiCandidates();

  for (const apiBase of candidates) {
    try {
      const response = await axios.get(`${apiBase}/blog/${slug}`, { timeout: 6000 });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.warn(`Blog post API unavailable for ${apiBase}`, error);
    }
  }

  return getFallbackBlogPostBySlug(slug);
};
