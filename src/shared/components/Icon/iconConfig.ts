export interface IconConfig {
  id: string;
  base: string;
  alt: string;
  inactive?: string;
  selected?: string;
}

export const icons: { [key: string]: IconConfig } = {
  favourites: {
    id: 'heart',
    base: 'heart.svg',
    alt: 'favourites icon',
    selected: 'heart-filled.svg',
  },
  cart: {
    id: 'shopping-bag',
    base: 'shopping-bag.svg',
    alt: 'shopping bag icon',
  },
  plus: {
    id: 'plus',
    base: 'plus.svg',
    alt: 'plus icon',
  },
  minus: {
    id: 'minus',
    base: 'minus.svg',
    alt: 'minus icon',
  },
  scrollUp: {
    id: 'arrow-up',
    base: 'arrow-up.svg',
    alt: 'arrow up icon',
  },
  back: {
    id: 'arrow-left',
    base: 'arrow-left.svg',
    alt: 'return back icon',
  },
  home: {
    id: 'home',
    base: 'home.svg',
    alt: 'home icon',
  },
  dark: {
    id: 'dark-theme',
    base: 'dark-theme.svg',
    alt: 'dark theme icon',
  },
  light: {
    id: 'light-theme',
    base: 'light-theme.svg',
    alt: 'light theme icon',
  },
  menu: {
    id: 'menu',
    base: 'menu.svg',
    alt: 'menu icon',
  },
  search: {
    id: 'search',
    base: 'search.svg',
    alt: 'search icon',
  },
  breadcrumbs: {
    id: 'arrow-right',
    base: 'arrow-right.svg',
    alt: 'arrow right icon',
  },
  left: {
    id: 'arrow-left',
    base: 'arrow-left.svg',
    inactive: 'arrow-left-inactive.svg',
    alt: 'arrow left icon',
  },
  right: {
    id: 'arrow-right',
    base: 'arrow-right.svg',
    inactive: 'arrow-right-inactive.svg',
    alt: 'arrow right icon',
  },
  expand: {
    id: 'arrow-down',
    base: 'arrow-down.svg',
    alt: 'down icon',
  },
  delete: {
    id: 'cross',
    base: 'cross.svg',
    alt: 'cross icon',
  },
  close: {
    id: 'close',
    base: 'close.svg',
    alt: 'close icon',
  },
  settings: {
    id: 'settings',
    base: 'settings.svg',
    alt: 'settings icon',
  },
  // delete
  empty: {
    id: 'heart',
    base: 'cross.svg',
    alt: 'cross icon',
    selected: 'cross.svg',
    inactive: 'cross.svg',
  },
};
