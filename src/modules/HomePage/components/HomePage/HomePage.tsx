import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../../../store/hooks';
import { getProductCount } from '../../../../shared/services/productService';
import { BannerSlider } from '../BannerSlider';
import { Loader } from '../../../../shared/components/Loader';
import { categories } from '../../../ProductPage/config/categories';
// eslint-disable-next-line max-len
import { PromotedProducts } from '../../../../shared/components/PromotedProducts';

export const HomePage: React.FC = () => {
  const { loaded } = useAppSelector(state => state.products);
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {},
  );

  useEffect(() => {
    setProductCount(
      categories.reduce((acc, next) => {
        return { ...acc, [next.name]: getProductCount(next) };
      }, productCount),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('page', styles.homePage)}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Catalog</h1>
        <p className={styles.welcome}>Welcome to Nice Gadgets store!</p>

        <BannerSlider />
      </div>

      <PromotedProducts type="new" />

      <div className={styles.categories}>
        <h2>Shop by category</h2>

        {categories.map(category => (
          <div className={styles.categoryWrapper} key={category.id}>
            <Link
              to={`/${category.name}`}
              className={styles.categoryImageLink}
              style={{
                backgroundColor: category.backgroundColor,
              }}
            >
              <img
                src={category.categoryImage}
                alt={`${category.pageTitle} image`}
              />
            </Link>

            <div className={styles.categoryInfo}>
              <Link to={`/${category.name}`}>
                <h4>{category.pageTitle}</h4>
              </Link>
              <p
                className={'body-text'}
              >{`${productCount[category.name]} model${productCount[category.name] !== 1 ? 's' : ''}`}</p>
            </div>
          </div>
        ))}
      </div>

      <PromotedProducts type="discounted" />

      {!loaded && <Loader />}
    </div>
  );
};
