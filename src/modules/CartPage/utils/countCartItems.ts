import { CartItem } from '../types/CartItem';
import { CartProductItem } from '../types/CartProductItem';

export const countCartItems = (
  cartProducts: CartProductItem[] | CartItem[],
) => {
  const hasPrice = 'product' in (cartProducts[0] || {});

  const initialAccumulator = hasPrice
    ? { totalItems: 0, totalSum: 0 }
    : { totalItems: 0 };

  return cartProducts.reduce((acc: typeof initialAccumulator, next) => {
    const nextItem = next as CartProductItem;
    const items = acc.totalItems + next.quantity;

    if (hasPrice) {
      const total = acc.totalSum as number;
      const sum = total + next.quantity * nextItem.product.price;

      return {
        totalItems: items,
        totalSum: sum,
      };
    }

    return { totalItems: items };
  }, initialAccumulator);
};
