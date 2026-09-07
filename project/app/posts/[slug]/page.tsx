import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getPost, getPosts, formatPostDate, renderMarkdown } from '@/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  if (posts.length === 0) return [{ slug: '__none__' }];
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Your Name' },
    mainEntityOfPage: `https://yourdomain.com/posts/${post.slug}`,
  };

  return (
    <main className="site-shell article-shell">
      <header className="site-header">
        <Link className="profile-mark" href="/" aria-label="Return to the home page"><span>YN</span></Link>
        <div className="identity">
          <Link href="/"><h1>Your Name</h1></Link>
          <p>Advertising Measurement</p>
        </div>
      </header>
      <div className="header-rule" aria-hidden="true" />
      <Link className="back-link" href="/"><ArrowLeft size={15} /> All articles</Link>
      <article className="article-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <p className="eyebrow">{formatPostDate(post.date)}</p>
        <h2>{post.title}</h2>
        <p className="article-summary">{post.summary}</p>
        {post.image && <img className="article-image" src={post.image} alt="" />}
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
      </article>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Your Name</p>
        <a className="connect-button" href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">Connect with me <ArrowUpRight size={16} /></a>
      </footer>
    </main>
  );
}
