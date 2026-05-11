import axios from 'axios';
import { ApiError } from '@/types';

export const API_URL = '/strapi/api/members';
export const UPLOAD_URL = '/strapi/api/upload';
export const ASSET_URL = '/strapi';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || '',
  headers: { 'Content-Type': 'application/json' },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('hr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg = error.response?.data?.error?.message || error.message || 'An error occurred';
    console.error('API Error:', msg);
    return Promise.reject({
      message: msg,
      code: error.response?.data?.error?.code,
      status: error.response?.status
    } as ApiError);
  }
);

export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('hr_token') : null;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getPhotoUrl = (photo: string | null | undefined): string => {
  if (!photo) return '/placeholder-team.png';
  if (photo.startsWith('http')) {
    // Proxy insecure backend IP to avoid Mixed Content
    return photo.replace(/http:\/\/183\.82\.117\.36:\d+/g, ASSET_URL);
  }
  return `${ASSET_URL}${photo}`;
};

// ─────────────────────────────────────────────────────────────
// BLOG API
// ─────────────────────────────────────────────────────────────

export const getStrapiMedia = (url: string | null | undefined): string => {
  if (!url) return '/placeholder-blog.png';
  if (url.startsWith('http')) {
    return url.replace(/http:\/\/183\.82\.117\.36:\d+/g, ASSET_URL);
  }
  return `${ASSET_URL}${url}`;
};

export const getBlogs = async () => {
  const response = await api.get('/strapi/api/blogs?populate=*');
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await api.get(`/strapi/api/blogs?filters[slug][$eq]=${slug}&populate=deep`);
  return response.data.data?.[0] || null;
};
