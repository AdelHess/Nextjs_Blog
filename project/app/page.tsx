import { getPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

export default function Home() {
  const posts = getPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    image: post.image,
    summary: post.summary,
  }));

  return <HomeClient posts={posts} />;
}
