import React, { createContext, useContext, useState } from 'react';

interface SearchState {
  searchOpen: boolean;
  searchBtnVisible: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  exposeSearchBtn: () => void;
  hideSearchBtn: () => void;
}

const SearchContext = createContext<SearchState>({
  searchOpen: false,
  searchBtnVisible: false,
  openSearch: () => {},
  closeSearch: () => {},
  exposeSearchBtn: () => {},
  hideSearchBtn: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchBtnVisible, setSearchBtnVisible] = useState(false);

  const exposeSearchBtn = () => setSearchBtnVisible(true);
  const hideSearchBtn = () => setSearchBtnVisible(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <SearchContext.Provider
      value={{
        searchOpen,
        searchBtnVisible,
        openSearch,
        closeSearch,
        exposeSearchBtn,
        hideSearchBtn,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchState => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
