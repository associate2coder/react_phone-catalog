import cn from 'classnames';
import React from 'react';

import { ActionButton } from '../../../../shared/components/ActionButton';
import { Link } from 'react-router-dom';

import { CartProductItem } from '../../types/CartProductItem';
import { useAppDispatch } from '../../../../store/hooks';
import { setItem } from '../../store/cartSlice';
import styles from './CartProduct.module.scss';
import { QuantityButton } from '../QuantityButton';

interface Props {
  cartProduct: CartProductItem;
  onQuantityChange: (newCartProduct: CartProductItem) => void;
}

export const CartProduct: React.FC<Props> = React.memo(
  ({ cartProduct, onQuantityChange }) => {
    const dispatch = useAppDispatch();
    const { product, quantity } = cartProduct;

    // handling plus button click
    const increaseByOne = () => {
      onQuantityChange({ ...cartProduct, quantity: cartProduct.quantity + 1 });
    };

    // handling minus button click
    const decreaseByOne = () => {
      onQuantityChange({ ...cartProduct, quantity: cartProduct.quantity - 1 });
    };

    // handling delete button click
    const handleDelete = () => {
      dispatch(setItem({ itemId: cartProduct.itemId, quantity: 0 }));
    };

    return (
      <div className={styles.item}>
        <div className={styles.block}>
          <div className={cn(styles.deleteBtn)}>
            <ActionButton type={`delete`} onClick={handleDelete} />
          </div>

          <Link
            to={`/${product.category}/${product.itemId}`}
            className={cn(styles.imageWrapper)}
          >
            <img
              src={product.image}
              alt={`${product.name} image`}
              className={styles.image}
            />
          </Link>

          <Link
            to={`/${product.category}/${product.itemId}`}
            className={cn('body-text', styles.title)}
          >
            {product.name}
          </Link>
        </div>

        <div className={styles.block}>
          <div className={cn(styles.quantityWrapper)}>
            <QuantityButton type="minus" onClick={decreaseByOne} />

            <input
              type="text"
              value={quantity}
              className={styles.quantity}
              readOnly
            />

            <QuantityButton type="plus" onClick={increaseByOne} />
          </div>

          <data
            className={cn(styles.price)}
          >{`$${quantity * product.price}`}</data>
        </div>
      </div>
    );
  },
);

CartProduct.displayName = 'CartProduct';
