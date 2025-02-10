import { useEffect, useMemo, useState } from 'react';
import { NavBar } from '../../NavBar';

import styles from './Header.module.scss';
import { MediaType } from '../../../types/MediaType';
import { NavButton } from '../../NavButton';

import { pages } from '../../../../config/pages';
import {
  useAppSelector,
  useCategory,
  useCurrentMediaType,
} from '../../../../store/hooks';

import { Search } from '../Search/Search';
import cn from 'classnames';
import { Menu } from '../../Menu/Menu';
import { Logo } from '../../Logo';
import { useMenu } from '../../../../store/MenuProvider';
import { useSearch } from '../../../../store/SearchProvider';
import { HeaderButton } from '../HeaderButton';
import { HeaderSettings } from '../HeaderSettings';
// eslint-disable-next-line max-len
import { countCartItems } from '../../../../modules/CartPage/utils/countCartItems';

export const Header: React.FC = () => {
  const favItems = useAppSelector(state => state.fav);
  const cartItems = useAppSelector(state => state.cart);
  const { menuOpen: menuOpen, openMenu } = useMenu();
  const { searchBtnVisible, exposeSearchBtn, hideSearchBtn } = useSearch();
  const category = useCategory();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const mediaType = useCurrentMediaType();

  const isMobile = mediaType === MediaType.mobile;

  useEffect(() => {
    if (category) {
      exposeSearchBtn();
    } else {
      hideSearchBtn();
    }
  }, [category, exposeSearchBtn, hideSearchBtn]);

  const { totalItems: cartItemsCount } = useMemo(() => {
    return countCartItems(cartItems);
  }, [cartItems]);

  return (
    <header className={cn('header', styles.header)}>
      <div className={styles.headerWrapper}>
        <Logo />

        {!isMobile && <NavBar />}
      </div>

      <div className={styles.headerWrapper}>
        {searchBtnVisible && <Search />}

        <HeaderButton
          type="settings"
          hasShadow={true}
          onClick={() => setSettingsOpen(!settingsOpen)}
        />

        {settingsOpen && <HeaderSettings />}

        {isMobile ? (
          <>
            {menuOpen && <Menu />}

            <HeaderButton type="menu" hasShadow={true} onClick={openMenu} />
          </>
        ) : (
          <>
            <NavButton
              icon="favourites"
              path={pages.favourites.name}
              counter={favItems.length}
            />
            <NavButton
              icon="cart"
              path={pages.cart.name}
              counter={cartItemsCount}
            />
          </>
        )}
      </div>
    </header>
  );
};
