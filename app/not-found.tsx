import Link from 'next/link';
import css from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist or has been moved.',

  openGraph: {
    title: 'Page Not Found | NoteHub',
    description:
      'The page you are looking for does not exist or has been moved.',
    url: 'https://notehub.com',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
