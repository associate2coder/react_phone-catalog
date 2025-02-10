import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { MediaType } from '../shared/types/MediaType';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { categories } from '../modules/ProductPage/config/categories';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCurrentMediaType = () => {
  const getCurrentMedia = (width: number) => {
    if (width >= 1200) {
      return MediaType.desktop;
    }

    if (width >= 640 && width < 1200) {
      return MediaType.tablet;
    }

    return MediaType.mobile;
  };

  const [media, setMedia] = useState(getCurrentMedia(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setMedia(getCurrentMedia(window.innerWidth));

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return media;
};

export const useCheckForSearchSpace = () => {
  const checkForSearchSpace = (width: number) => {
    return (width >= 320 && width < 640) || width >= 800;
  };

  const [hasSpaceForSearch, setHasSpaceForSearch] = useState(
    checkForSearchSpace(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () =>
      setHasSpaceForSearch(checkForSearchSpace(window.innerWidth));

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return hasSpaceForSearch;
};

export const useCategory = () => {
  const currentPageIndexPath = useLocation().pathname.split('/')[1];
  const currentCategory = categories.find(
    category => category.name === currentPageIndexPath,
  );

  return currentCategory;
};
