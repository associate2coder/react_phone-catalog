/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { ProductDetails } from '../../../../shared/types/ProductDetails';
import {
  Category,
  getProductDetails,
} from '../../../../shared/services/productService';
import { About } from '../About';
import { PromotedProducts } from '../../../../shared/components/PromotedProducts';
import { ProductOptions } from '../ProductOptions/ProductOptions';
import { Specs } from '../../../../shared/components/Specs';
import { ImageGallery } from '../ImageGallery/ImageGallery';

import styles from './ProductDetailsPage.module.scss';
import { techSpecs } from '../../../../config/specsConfig';
import { ErrorBlock } from '../../../../shared/components/ErrorBlock';
import { useCategory } from '../../../../store/hooks';
import { CategoryPage } from '../../../../shared/types/Page';
import { pickProductDetailsFields } from '../../../../shared/utils/productPageHelper';
import { Breadcrumbs } from '../../../../shared/components/Breadcrumbs/components/Breadcrumbs';
import { BackLink } from '../../../../shared/components/Breadcrumbs/components/BackLink';

export const ProductDetailsPage: React.FC = () => {
  const { name: category } = useCategory() as CategoryPage;
  const { productId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [cachedProduct, setCachedProduct] = useState<ProductDetails | null>(
    null,
  );

  // Fetch product from API.
  // cache current product to ensure seamless reload
  useEffect(() => {
    setLoaded(false);
    setError('');
    setCachedProduct(product);

    getProductDetails(category as Category, productId!)
      .then(item => {
        if (item) {
          setProduct(item);
        } else {
          throw new Error('Product not found');
        }
      })
      .catch(() => {
        setError('Something went wrong');
        // navigate(`not-found`, { replace: true });
      })
      .finally(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, productId]);

  //Selecting Tech Specs. Scope of Specs identified in config
  const getTechSpecs = useCallback(
    () =>
      pickProductDetailsFields(
        product || (cachedProduct as ProductDetails),
        techSpecs,
      ),
    [cachedProduct, product],
  );

  const visibleProduct = product || cachedProduct;
  const hasVisibleProduct =
    (loaded && product && !error) || (!loaded && cachedProduct && !error);
  const hasError = loaded && error;

  return (
    <div className={cn('page', 'product-details-page', styles.productPage)}>
      <header className={styles.pageHeader}>
        <Breadcrumbs productTitle={(product || cachedProduct)?.name} />

        <BackLink />

        {visibleProduct && <h1>{visibleProduct?.name}</h1>}
      </header>

      {hasError && (
        <ErrorBlock image="img/error.png" text={error} reload={true} />
      )}

      {hasVisibleProduct && (
        <>
          <div className={cn(styles.contentSection, styles.productSection)}>
            <ImageGallery
              images={(product || cachedProduct)?.images || []}
              name={(product || cachedProduct)?.name || ''}
            />

            <ProductOptions
              product={product || (cachedProduct as ProductDetails)}
            />
          </div>

          <div className={cn(styles.contentSection)}>
            <About
              description={(product || cachedProduct)?.description || []}
            />

            <Specs specs={getTechSpecs()} ancestor="ProductPage" />
          </div>

          <PromotedProducts />
        </>
      )}
    </div>
  );
};
