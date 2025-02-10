import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { colorMap } from '../../config/colorConfig';

export const isProduct: (
  product: Product | ProductDetails,
) => product is Product = (product: Product | ProductDetails) => {
  return 'itemId' in product;
};

export const pick = <T extends ProductDetails | Product, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => keys.includes(key as K))
      .sort(
        ([key1], [key2]) => keys.indexOf(key1 as K) - keys.indexOf(key2 as K),
      ),
  ) as Pick<T, K>;
};

export const pickProductDetailsFields = <
  T extends ProductDetails,
  K extends keyof T,
>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return pick(obj, keys);
};

export const pickProductFields = <T extends Product, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return pick(obj, keys);
};

export const getHex: (option: string) => string = option => {
  return colorMap[option as keyof typeof colorMap] || '#fff';
};
