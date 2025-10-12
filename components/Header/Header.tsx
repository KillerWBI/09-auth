import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' className={css.headerLink} aria-label='Home'>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href='/' className={css.navigationLink}>Home</Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
          <AuthNavigation/>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
