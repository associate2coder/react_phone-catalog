import React, { useMemo } from 'react';
import { Product } from '../../../../types/Product';

import { ProductDetails } from '../../../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { isProduct } from '../../../../utils/productPageHelper';
import { PurchaseButton } from '../../../PurchaseButton';
import { addItem } from '../../../../../modules/CartPage/store/cartSlice';

interface Props {
  product: Product | ProductDetails;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const itemId = isProduct(product) ? product.itemId : product.id;

  const handleClick = () => {
    dispatch(addItem(itemId));
  };

  const inCart = useMemo(() => {
    return cart.map(item => item.itemId).includes(itemId);
  }, [cart, itemId]);

  const btnText = inCart ? 'Added to cart' : 'Add to cart';

  return (
    <PurchaseButton
      text={btnText}
      type="addToCart"
      onClick={handleClick}
      selected={inCart}
    />
  );
};
