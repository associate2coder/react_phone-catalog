import React from 'react';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';

import styles from './NavBar.module.scss';

import cn from 'classnames';
import { useMenu } from '../../../store/MenuProvider';

export const NavBar: React.FC = () => {
  const pages: string[] = ['home', 'phones', 'tablets', 'accessories'];
  const location = useLocation();
  const { closeMenu } = useMenu();

  const getNavLinkActiveClass = (
    { isActive }: NavLinkRenderProps,
    page: string,
  ) =>
    cn(styles.navLink, styles.navLinkUnderscore, {
      [styles.navLinkActive]:
        isActive || (page === 'home' && location.pathname === '/'),
    });

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        {pages.map(page => (
          <li key={page} className={styles.navItem}>
            <NavLink
              to={`/${page}`}
              className={props => getNavLinkActiveClass(props, page)}
              onClick={() => closeMenu(300)}
            >
              {page}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
