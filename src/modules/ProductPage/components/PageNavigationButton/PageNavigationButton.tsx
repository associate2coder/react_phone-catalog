import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import cn from 'classnames';
import { Icon } from '../../../../shared/components/Icon';
import { getSearchWith } from '../../utils/getSearchWith';
import styles from './PageNavigationButton.module.scss';

interface Props {
  next: boolean;
  pages: number;
}

export const PageNavigationButton: React.FC<Props> = ({ next, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const step = next ? 1 : -1;
  const newPage = currentPage + step;
  const isDisabled = next ? currentPage === pages : currentPage === 1;
  const icon = next ? 'right' : 'left';

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }

    setSearchParams(getSearchWith(searchParams, { page: `${newPage}` }));
  }, [isDisabled, newPage, searchParams, setSearchParams]);

  return (
    <button
      className={cn('button', 'square-button', styles.pageNavigationButton, {
        [styles.inactive]: isDisabled,
        'no-animation': isDisabled,
      })}
      onClick={handleClick}
    >
      <Icon configKey={icon} inactive={isDisabled} />
    </button>
  );
};
