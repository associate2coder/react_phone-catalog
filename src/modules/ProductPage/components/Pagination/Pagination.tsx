import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { calculateCurrentRange } from '../../utils/paginationHelpers';
import { getSearchWith } from '../../utils/getSearchWith';
import { PageNavigationButton } from '../PageNavigationButton';
import { PageSelectionButton } from '../PageSelectionButton';

interface Props {
  productsCount: number;
}

export const Pagination: React.FC<Props> = ({ productsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = +(searchParams.get('perPage') || productsCount);
  const currentPage = searchParams.get('page') || '1';
  const pageCount = useMemo(() => {
    return Math.ceil(productsCount / perPage);
  }, [perPage, productsCount]);
  const [visibleRange, setVisibleRange] = useState<string[]>(
    calculateCurrentRange(pageCount, +currentPage),
  );

  //RESET Pagination when perPage is changed
  const perPageRef = useRef(perPage);

  useEffect(() => {
    if (perPage !== perPageRef.current) {
      setSearchParams(getSearchWith(searchParams, { page: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);

  useEffect(() => {
    setVisibleRange(calculateCurrentRange(pageCount, +currentPage));
  }, [currentPage, pageCount]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return (
    <div className={cn('pagination', styles.pagination)}>
      <PageNavigationButton next={false} pages={pageCount} />

      <div className={styles.pageButtonsContainer}>
        {visibleRange.map((value, i) => (
          <PageSelectionButton value={value} key={`${value}-${i}`} />
        ))}
      </div>

      <PageNavigationButton next={true} pages={pageCount} />
    </div>
  );
};
