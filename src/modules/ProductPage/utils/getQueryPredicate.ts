import { Product } from '../../../shared/types/Product';

export const getQueryPredicate: (
  query?: string,
) => (product: Product) => boolean = (query: string = '') => {
  if (query) {
    return (product: Product) =>
      product.name.toLowerCase().includes(query.toLowerCase());
  }

  return product => !!product;
};
