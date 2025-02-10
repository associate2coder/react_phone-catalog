import cn from 'classnames';
import styles from './NavButton.module.scss';
import navStyles from '../NavBar/NavBar.module.scss';
import React from 'react';
import { NavLink, NavLinkRenderProps, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { Counter } from './Counter';
import { useMenu } from '../../../store/MenuProvider';

interface Props {
  icon: string;
  path: string;
  counter?: number;
}

export const NavButton: React.FC<Props> = React.memo(
  ({ icon, path, counter }) => {
    const location = useLocation();
    const { closeMenu } = useMenu();
    const counterVisible = counter && counter > 0;

    const getNavLinkActiveClass = (
      { isActive }: NavLinkRenderProps,
      page: string,
    ) =>
      cn(
        'button',
        'square-button',
        navStyles.navLinkUnderscore,
        styles.navButton,
        {
          [navStyles.navLinkActive]:
            isActive || (page === 'home' && location.pathname === '/'),
          'no-animation': isActive,
        },
      );

    return (
      <NavLink
        to={path}
        state={{ from: location.pathname, search: location.search }}
        className={props => getNavLinkActiveClass(props, path)}
        onClick={() => closeMenu(300)}
      >
        <Icon configKey={icon} />

        {counterVisible ? <Counter count={counter} /> : <></>}
      </NavLink>
    );
  },
);

NavButton.displayName = 'NavButton';
