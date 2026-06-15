import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function NotesSidebar() {
  const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/all">
            All notes
          </Link>
        </li>

        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
