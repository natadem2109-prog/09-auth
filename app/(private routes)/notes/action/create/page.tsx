import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description:
    'Create a new note in NoteHub. Save your ideas, tasks and thoughts quickly and easily.',

  openGraph: {
    title: 'Create Note | NoteHub',
    description:
      'Create a new note in NoteHub. Save your ideas, tasks and thoughts quickly and easily.',
    url: 'https://notehub.com/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note page',
      },
    ],
    type: 'website',
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
