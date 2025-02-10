/* eslint-disable max-len */
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

import { SortBy } from '../../types/SortBy';
import { Filter } from '../Filter';
import { Pagination } from '../Pagination';
import { Loader } from '../../../../shared/components/Loader';
import { ErrorBlock } from '../../../../shared/components/ErrorBlock';
import { ProductList } from '../../../../shared/components/ProductList';
import { Breadcrumbs } from '../../../../shared/components/Breadcrumbs/components/Breadcrumbs';

import { useAppSelector, useCategory } from '../../../../store/hooks';
import { calculatePaginationSlice } from '../../utils/paginationHelpers';
import styles from './ProductPage.module.scss';
import { CategoryPage } from '../../../../shared/types/Page';
import { getQueryPredicate } from '../../utils/getQueryPredicate';
import { getSortingComparator } from '../../utils/getSortingComparator';

export const ProductPage: React.FC = () => {
  const category = useCategory() as CategoryPage;
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 'all';
  const {
    items: products,
    loaded,
    error,
  } = useAppSelector(state => state.products);

  // get and cache quantity of all products in current category
  const categoryProducts = useMemo(
    () => products.filter(product => product.category === category.name),
    [category, products],
  );

  // get and cache quantity of all products in current category
  const productCount = useMemo(
    () => categoryProducts.length,
    [categoryProducts],
  );

  // filter and sort products as per searchParams
  const preparedProducts = useMemo(() => {
    const sortParam = (searchParams.get('sort') as SortBy) || SortBy.age;
    const queryParam = (searchParams.get('query') as string) || '';

    return categoryProducts
      .filter(getQueryPredicate(queryParam))
      .sort(getSortingComparator(sortParam));
  }, [categoryProducts, searchParams]);

  // slice products for pagination
  const currentPageProducts = useCallback(() => {
    const length = preparedProducts.length;
    const perPageCount = perPage === 'all' ? length : +perPage;
    const page = perPageCount < length ? +(searchParams.get('page') || '1') : 1;
    const [startIndex, endIndex] = calculatePaginationSlice(
      length,
      perPageCount,
      page,
    );

    return preparedProducts.slice(startIndex, endIndex);
  }, [perPage, preparedProducts, searchParams]);

  // conditional rendering variables
  const hasError = loaded && error;
  const nothingToShow = loaded && !error && preparedProducts.length === 0;

  return (
    <div
      className={cn('page', styles.categoryPage, {
        [styles.error]: error,
      })}
    >
      {!error && (
        <>
          <header className={styles.pageHeader}>
            <Breadcrumbs />
            <h1 className={styles.pageTitle}>{category.pageTitle}</h1>
            <p className={cn('body-text', styles.modelCount)}>
              {productCount === 0
                ? ``
                : `${productCount} model${productCount === 1 ? '' : 's'}`}
            </p>
          </header>

          <Filter />
        </>
      )}

      {!loaded && <Loader />}

      {hasError && (
        <ErrorBlock
          image="img/error.png"
          text="Something went wrong..."
          reload={true}
        />
      )}

      {!error && (
        <>
          <ProductList products={currentPageProducts()} />

          <Pagination productsCount={preparedProducts.length} />
        </>
      )}

      {nothingToShow && <p className={'not-found-text'}>No products found</p>}
    </div>
  );
};
