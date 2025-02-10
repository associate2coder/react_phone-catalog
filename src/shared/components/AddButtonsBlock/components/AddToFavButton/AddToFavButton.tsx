/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Product } from '../../../../types/Product';

import { ProductDetails } from '../../../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { toggle as toggleFavs } from '../../../../../modules/FavouritesPage/store/favSlice';
import { Icon } from '../../../Icon';
import styles from './AddToFavButton.module.scss';

interface Props {
  product: Product | ProductDetails;
}

function isProduct(product: Product | ProductDetails): product is Product {
  return 'itemId' in product;
}

export const AddToFavButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favProducts = useAppSelector(state => state.fav);

  const itemId: string = isProduct(product) ? product.itemId : product.id;

  const inFavourites = favProducts.includes(itemId);

  const handleClick = () => {
    dispatch(toggleFavs(itemId));
  };

  return (
    <button
      className={cn('button', 'square-button', styles.favourites)}
      onClick={handleClick}
    >
      <Icon configKey="favourites" selected={inFavourites} />
    </button>
  );
};
