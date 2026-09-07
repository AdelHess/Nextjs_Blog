import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';
  return [{ url: baseUrl, lastModified: new Date() }, ...getPosts().map((post) => ({ url: `${baseUrl}/posts/${post.slug}`, lastModified: new Date(post.date) }))];
}
