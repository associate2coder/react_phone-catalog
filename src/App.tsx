import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './shared/components/Footer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { localStorageKeys } from './config/constants';
import cn from 'classnames';
import { Theme } from './shared/types/Theme';
import { initProducts } from './store/productsSlice';
import { Header } from './shared/components/Header/Header/Header';

export const App = () => {
  const dispatch = useAppDispatch();
  const favItems = useAppSelector(state => state.fav);
  const cartItems = useAppSelector(state => state.cart);
  const theme = useAppSelector(state => state.theme);

  // save favourites to localStorage for it to survive reload
  useEffect(() => {
    localStorage.setItem(localStorageKeys.favourites, JSON.stringify(favItems));
  }, [favItems]);

  // save cart to localStorage for it to survive reload
  useEffect(() => {
    localStorage.setItem(localStorageKeys.cart, JSON.stringify(cartItems));
  }, [cartItems]);

  // save theme to localStorage for it to survive reload
  useEffect(() => {
    localStorage.setItem(localStorageKeys.theme, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    dispatch(initProducts());
  });

  return (
    <div
      className={cn('App', {
        'App--dark': theme === Theme.dark,
        'App--light': theme === Theme.light,
      })}
    >
      <Header />
      <main className="App__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
