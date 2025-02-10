import React, { useCallback } from 'react';
import styles from './Filter.module.scss';

import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown/Dropdown';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { getSearchWith } from '../../utils/getSearchWith';

export const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const curSortOtion = searchParams.get('sort') || SortBy.age;
  const curPerPageOption = searchParams.get('perPage') || PerPage.some16;

  const handleSelection = useCallback(
    (key: string, value: string) => {
      setSearchParams(getSearchWith(searchParams, { [key]: value }));
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className={styles.filter}>
      <Dropdown
        title="Sort by"
        options={Object.values(SortBy)}
        selected={curSortOtion}
        onSelect={(value: string) => handleSelection('sort', value)}
      />

      <Dropdown
        title="Items on page"
        options={Object.values(PerPage)}
        selected={curPerPageOption}
        onSelect={(value: string) => handleSelection('perPage', value)}
      />
    </div>
  );
};
