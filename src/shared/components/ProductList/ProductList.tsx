import React from 'react';
import styles from './ProductList.module.scss';
import cn from 'classnames';

import { ProductCard } from '../ProductCard';

import { Product } from '../../types/Product';
import { useAppSelector } from '../../../store/hooks';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = React.memo(({ products }) => {
  const { loaded } = useAppSelector(state => state.products);
  const skeletonIds = [1, 2, 3, 4];

  return (
    <div className={cn(styles.productList)}>
      {loaded &&
        products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}

      {!loaded &&
        skeletonIds.map(id => <ProductCardSkeleton key={`skeleton-pl${id}`} />)}
    </div>
  );
});

ProductList.displayName = 'ProductList';
