import { useSearchParams } from 'react-router-dom';
import styles from './PageSelectionButton.module.scss';
import { useCallback } from 'react';
import cn from 'classnames';
import { getSearchWith } from '../../utils/getSearchWith';

interface Props {
  value: string;
}

const skipped = '...';

export const PageSelectionButton: React.FC<Props> = ({ value }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const isSelected =
    (pageParam && pageParam === value) || (!pageParam && value === '1');
  const isDisabled = value === skipped;

  const handleClick = useCallback(() => {
    if (isSelected || isDisabled) {
      return;
    }

    setSearchParams(getSearchWith(searchParams, { page: value }));
  }, [isSelected, isDisabled, setSearchParams, searchParams, value]);

  return (
    <button
      className={cn('button', 'square-button', styles.pageSelectionButton, {
        [styles.selected]: isSelected,
        [styles.inactive]: isDisabled,
      })}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
