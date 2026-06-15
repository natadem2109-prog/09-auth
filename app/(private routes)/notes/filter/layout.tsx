import React from 'react';
import css from './../layout.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section>
      <div className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>

        <div className={css.notesWrapper}>{children}</div>
      </div>
    </section>
  );
}
