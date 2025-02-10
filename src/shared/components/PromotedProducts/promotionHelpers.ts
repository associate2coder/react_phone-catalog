import { Product } from '../../types/Product';

const getNamespaceFromImageURL = (url: string) => {
  return url.split('/')[2] || '';
};

const getDiscount = (a: Product) => a.price - a.fullPrice;

export const getNew = (products: Product[], quantity: number) => {
  return products.toSorted((a, b) => b.year - a.year).slice(0, quantity) || [];
};

export const getDiscounted = (products: Product[], quantity: number) => {
  const sortedSlice = products
    .toSorted((a, b) => getDiscount(a) - getDiscount(b))
    .slice(0, quantity);

  // in the absence of discounted products, another options can be elaborated
  return sortedSlice.filter(product => getDiscount(product) <= 0);
};

export const getRecommended = (
  products: Product[],
  quantity: number,
  exclusionIds: string[],
  category?: string,
) => {
  const nameSpaceIds = new Set<string>();

  const recommended = products.reduce<Product[]>((acc, product, index) => {
    const namespace = getNamespaceFromImageURL(product.image);

    if (
      // excluded products are not recommended (favourites, cart, etc.)
      // only one product (out of set of modifications) is suggested
      // suggestions made based on category (if chosen))
      !exclusionIds.includes(product.itemId) &&
      !nameSpaceIds.has(namespace) &&
      (!category || product.category === category)
    ) {
      nameSpaceIds.add(namespace);

      if (acc.length < quantity) {
        // initial "reservoir" is filled
        acc.push(product);
      } else {
        // elements randomly replaced with decreased probability
        const randomIndex = Math.floor(Math.random() * (index + 1));

        if (randomIndex < quantity) {
          // eslint-disable-next-line no-param-reassign
          acc[randomIndex] = product;
        }
      }
    }

    return acc;
  }, new Array<Product>());

  return recommended.sort((p1, p2) => p2.year - p1.year);
};

export const promotionGetters = {
  new: getNew,
  discounted: getDiscounted,
  recommended: getRecommended,
};
