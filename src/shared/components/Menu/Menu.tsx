import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './Menu.module.scss';
import { NavBar } from '../NavBar';
import { NavButton } from '../NavButton';
import { Logo } from '../Logo';
import { countCartItems } from '../../../modules/CartPage/utils/countCartItems';
import { useAppSelector } from '../../../store/hooks';
import { useMenu } from '../../../store/MenuProvider';
import { HeaderButton } from '../Header/HeaderButton';

export const Menu: React.FC = React.memo(() => {
  const { menuOpen, closeMenu } = useMenu();

  const cart = useAppSelector(state => state.cart);
  const favs = useAppSelector(state => state.fav);

  const cartItems = useMemo(() => countCartItems(cart).totalItems, [cart]);

  return (
    <aside
      className={cn('menu', styles.menu, {
        [styles.open]: menuOpen,
      })}
    >
      <div className={styles.header}>
        <Logo />

        <HeaderButton
          type="close"
          hasShadow={true}
          onClick={() => closeMenu()}
        />
      </div>

      <NavBar />

      <div className={styles.navButtons}>
        <NavButton icon="favourites" path={`/favourites`} counter={cartItems} />

        <NavButton icon="cart" path={'/cart'} counter={favs.length} />
      </div>
    </aside>
  );
});

Menu.displayName = 'Menu';
