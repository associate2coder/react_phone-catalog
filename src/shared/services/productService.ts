import { store } from '../../store/store';
import { Page } from '../types/Page';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { apiClient } from '../utils/apiClient';

export type Category = 'phones' | 'tablets' | 'accessories';

const categoryEndpoints = {
  phones: 'api/phones.json',
  tablets: 'api/tablets.json',
  accessories: 'api/accessories.json',
};

export const getDetailedProducts = (category: Category) => {
  return apiClient.get<ProductDetails[]>(categoryEndpoints[category]);
};

export const getProductDetails = async (category: Category, id: string) => {
  const products = await getDetailedProducts(category);

  const target = products.find(product => {
    return product.id === id;
  });

  if (!target) {
    throw new Error(`Product not found with id ${id}`);
  }

  return target;
};

export const getProductDetailsAndModifications: (
  category: Category,
  id: string,
) => Promise<[ProductDetails, ProductDetails[]]> = async (category, id) => {
  const products = await getDetailedProducts(category);

  const target = products.find(product => {
    return product.id === id;
  });

  if (!target) {
    throw new Error(`Product not found with id ${id}`);
  }

  const modifications = products.filter(
    product => product.namespaceId === target.namespaceId,
  );

  return [target, modifications];
};

export const getProducts = async () => {
  return apiClient.get<Product[]>('api/products.json');
};

export const getProductCount = (category: Page) => {
  const state = store.getState();
  const products = state.products.items;

  return products.reduce((count, product): number => {
    if (product.category === category.name) {
      return count + 1;
    }

    return count;
  }, 0);
};

export const getProductId = (itemId: string) => {
  const products = store.getState().products.items;
  const item = products.find(product => product.itemId === itemId);

  return item ? `${item.id}` : '';
};
