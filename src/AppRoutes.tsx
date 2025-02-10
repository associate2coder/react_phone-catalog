/* eslint-disable max-len */
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { CartPage } from './modules/CartPage/components/CartPage';
import { HomePage } from './modules/HomePage/components/HomePage';
import { FavouritesPage } from './modules/FavouritesPage/components/FavouritesPages';
import { ProductPage } from './modules/ProductPage/components/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/components/ProductDetailsPage';
import { PageNotFound } from './modules/NotFoundPage/components/NotFoundPage';
import { categories } from './modules/ProductPage/config/categories';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />

        {categories.map(page => (
          <Route path={page.name} key={page.id}>
            <Route index element={<ProductPage />} />
            <Route path=":productId?" element={<ProductDetailsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        ))}

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
