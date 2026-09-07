'use client';

import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

export type PostCard = {
  slug: string;
  title: string;
  date: string;
  image?: string;
  summary: string;
};

const postsPerPage = 5;

export default function HomeClient({ posts }: { posts: PostCard[] }) {
  const pageCount = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const hash = window.location.hash.replace('#page-', '');
    const parsed = Number(hash);
    if (parsed >= 1 && parsed <= pageCount) {
      setCurrentPage(parsed);
    }
  }, [pageCount]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.location.hash = page === 1 ? '' : `page-${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visiblePosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(date));
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="profile-mark" href="/" aria-label="Return to the home page"><span>YN</span></Link>
        <div className="identity">
          <h1>Your Name</h1>
          <p>Advertising Measurement</p>
        </div>
      </header>
      <div className="header-rule" aria-hidden="true"><Minus /></div>

      <section className="intro" aria-labelledby="journal-heading">
        <p className="eyebrow">The journal</p>
        <h2 id="journal-heading">Notes on making<br /><em>attention</em> accountable.</h2>
        <p className="intro-copy">A personal record of ideas, observations, and lessons from the evolving world of advertising measurement.</p>
      </section>

      {visiblePosts.length > 0 ? (
        <section className="post-list" aria-label="Latest articles">
          {visiblePosts.map((post, index) => (
            <article className={`post-card post-card-${index % 3}`} key={post.slug}>
              <div className="post-number">{String((currentPage - 1) * postsPerPage + index + 1).padStart(2, '0')}</div>
              {post.image ? (
                <img className="post-image" src={post.image} alt="" loading="lazy" />
              ) : (
                <div className="post-image image-placeholder" aria-hidden="true" />
              )}
              <div className="post-content">
                <p className="post-date">{formatDate(post.date)}</p>
                <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
                <p className="post-summary">{post.summary}</p>
                <Link className="read-link" href={`/posts/${post.slug}`}>Read article <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state" aria-live="polite">
          <span className="empty-line" aria-hidden="true" />
          <p>No articles yet. Check back soon.</p>
          <span className="empty-line" aria-hidden="true" />
        </section>
      )}

      {posts.length > postsPerPage && (
        <nav className="pagination" aria-label="Pagination">
          {currentPage > 1 ? (
            <button className="pagination-link" onClick={() => goToPage(currentPage - 1)}>
              <ChevronLeft size={16} /> Previous
            </button>
          ) : (
            <span className="pagination-disabled"><ChevronLeft size={16} /> Previous</span>
          )}
          <span className="pagination-current">
            {String(currentPage).padStart(2, '0')} <span>of {String(pageCount).padStart(2, '0')}</span>
          </span>
          {currentPage < pageCount ? (
            <button className="pagination-link" onClick={() => goToPage(currentPage + 1)}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <span className="pagination-disabled">Next <ChevronRight size={16} /></span>
          )}
        </nav>
      )}

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Your Name</p>
        <a className="connect-button" href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
          Connect with me <ArrowUpRight size={16} />
        </a>
      </footer>
    </main>
  );
}
