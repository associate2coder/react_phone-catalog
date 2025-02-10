import { pages } from '../../../config/pages';
import { CategoryPage } from '../../../shared/types/Page';

export const categories: CategoryPage[] = [
  {
    ...pages.phones,
    categoryImage: 'img/category-phones-figma.png',
    backgroundColor: '#6D6474',
  },
  {
    ...pages.tablets,
    categoryImage: 'img/category-tablets-figma.png',
    backgroundColor: '#8D8D92',
  },
  {
    ...pages.accessories,
    categoryImage: 'img/category-accessories-figma.png',
    backgroundColor: '#973D5F',
  },
];
