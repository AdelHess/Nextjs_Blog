import fs from 'fs';
import path from 'path';

export type Post = {
  slug: string;
  title: string;
  date: string;
  image?: string;
  summary: string;
  body: string;
};

const postsDirectory = path.join(process.cwd(), 'content/posts');

function parseFrontMatter(source: string): { attributes: Record<string, string>; body: string } {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { attributes: {}, body: source };

  const attributes: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    attributes[key] = value;
  });

  return { attributes, body: match[2].trim() };
}

function toSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs.readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const source = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
      const { attributes, body } = parseFrontMatter(source);
      return {
        slug: toSlug(filename),
        title: attributes.title || 'Untitled post',
        date: attributes.date || '',
        image: attributes.image || undefined,
        summary: attributes.summary || '',
        body,
      };
    })
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(date));
}

export function renderMarkdown(markdown: string): string {
  return markdown
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/^### (.*)$/gm, '<strong>$1</strong>').replace(/^## (.*)$/gm, '<strong>$1</strong>').replace(/^# (.*)$/gm, '<strong>$1</strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br />')}</p>`)
    .join('');
}
