import { Product } from '../../../shared/types/Product';
import { SortBy } from '../types/SortBy';

const compareStrings = (first: string, second: string) => {
  return first.localeCompare(second);
};

const compareNumbers = (first: number, second: number, asc: boolean = true) => {
  const direction = asc ? 1 : -1;

  return direction * (first - second);
};

const compareByYear = (product: Product, other: Product) => {
  return compareNumbers(product.year, other.year, false);
};

const compareByPrice = (product: Product, other: Product) => {
  return compareNumbers(product.price, other.price);
};

const compareByName = (product: Product, other: Product) => {
  return compareStrings(product.name, other.name);
};

const compareFunction = {
  [SortBy.age]: compareByYear,
  [SortBy.price]: compareByPrice,
  [SortBy.title]: compareByName,
};

export const getSortingComparator: (
  sortBy?: SortBy,
) => (product: Product, other: Product) => number = (
  sortBy: SortBy = SortBy.age,
) => compareFunction[sortBy];
