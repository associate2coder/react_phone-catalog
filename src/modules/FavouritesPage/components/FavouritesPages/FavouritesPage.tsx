/* eslint-disable max-len */
import cn from 'classnames';
import { useMemo } from 'react';

import styles from '../../../ProductPage/components/ProductPage/ProductPage.module.scss';
import favStyles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../../../store/hooks';
import { ProductList } from '../../../../shared/components/ProductList';
import { Breadcrumbs } from '../../../../shared/components/Breadcrumbs/components/Breadcrumbs';

const prepareItemCountText = (count: number) =>
  `${count} item${count !== 1 ? 's' : ''}`;

export const FavouritesPage: React.FC = () => {
  const { items: products } = useAppSelector(state => state.products);

  const favProducts = useAppSelector(state => state.fav);

  const preparedProducts = useMemo(() => {
    return products.filter(product => favProducts.includes(product.itemId));
  }, [products, favProducts]);

  return (
    <div className={cn('page', favStyles.favourites)}>
      <header className={styles.pageHeader}>
        <Breadcrumbs />

        <h1 className={styles.pageTitle}>Favourites</h1>

        <p className={styles.modelCount}>
          {prepareItemCountText(favProducts.length)}
        </p>
      </header>

      <ProductList products={preparedProducts} />
    </div>
  );
};
