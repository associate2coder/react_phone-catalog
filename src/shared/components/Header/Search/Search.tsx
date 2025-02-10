import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../../Icon';
import { useCheckForSearchSpace } from '../../../../store/hooks';
import { useSearch } from '../../../../store/SearchProvider';
// eslint-disable-next-line max-len
import { getSearchWith } from '../../../../modules/ProductPage/utils/getSearchWith';
import { HeaderButton } from '../HeaderButton';

// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (callback: Function, delay: number = 300) => {
  let timerId = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => callback(...args), delay);
  };
};

export const Search: React.FC = () => {
  const { searchOpen, openSearch, closeSearch } = useSearch();
  const hasSpace = useCheckForSearchSpace();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const inputRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef(query);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // if there is query in URL, input should be visible
  useEffect(() => {
    if (!!searchParams.get('query') && !searchOpen) {
      openSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update queryRef for the purpose of further hiding empty input on click
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(
    debounce((value: string) => {
      setSearchParams(getSearchWith(searchParams, { query: value || null }));
    }),
    [],
  );

  // hiding empty input if it stays empty for 10s
  useEffect(() => {
    if (queryRef.current !== '') {
      return;
    }

    const timerId = setTimeout(() => closeSearch(), 10000);

    if (queryRef.current !== '') {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // changing input value with debounce for URLSearchParams
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setQuery(value);
      applyQuery(value);
    },
    [applyQuery],
  );

  // Focus input on first appearance
  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return searchOpen ? (
    <>
      <div
        ref={inputWrapperRef}
        className={cn(styles.inputWrapper, {
          [styles.active]: hasSpace && searchOpen,
          [styles.hasNoSpace]: !hasSpace && searchOpen,
          [styles.inactive]: !searchOpen,
        })}
      >
        <Icon configKey={'search'} inactive={false} hidden={!searchOpen} />

        <input
          placeholder="Search"
          ref={inputRef}
          value={query}
          onChange={handleChange}
          className={cn('body-text', styles.input)}
        />
      </div>
    </>
  ) : (
    <HeaderButton type="search" hasShadow={true} onClick={openSearch} />
  );
};
