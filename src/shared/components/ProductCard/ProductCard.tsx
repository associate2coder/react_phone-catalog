import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { ProductPrice } from '../ProductPrice';
import { Specs } from '../Specs';

import { Product } from '../../types/Product';
import { pickProductFields } from '../../utils/productPageHelper';
import { cardSpecs } from '../../../config/specsConfig';
import styles from './ProductCard.module.scss';
import { AddButtonsBlock } from '../AddButtonsBlock/components/AddButtonsBlock';

interface Props {
  product: Product;
  showOldPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showOldPrice = false,
}) => {
  const location = useLocation();
  const productSpecs = pickProductFields(product, cardSpecs);

  const scrollOnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn('product-card', styles.card)}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ from: location.pathname, search: location.search }}
        className={styles.imageLink}
        onClick={scrollOnClick}
      >
        <img
          src={product.image}
          alt={`${product.name} image`}
          className={styles.image}
        />
      </Link>

      <div className={styles.titleContainer}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{ from: location.pathname, search: location.search }}
          className={cn('body-text', styles.title)}
          onClick={scrollOnClick}
        >
          {product.name}
        </Link>
      </div>

      <ProductPrice
        price={product.price}
        oldPrice={product.fullPrice}
        showOldPrice={showOldPrice}
      />

      <div className="divider" />

      <Specs specs={productSpecs} ancestor="ProductCard" />

      <AddButtonsBlock product={product} />
    </div>
  );
};
