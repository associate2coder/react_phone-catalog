import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';
import { AddToCartButton } from '../AddToCartButton/AddToCartButtons';
import { AddToFavButton } from '../AddToFavButton';
import styles from './AddButtonsBlock.module.scss';

interface Props {
  product: Product | ProductDetails;
}

export const AddButtonsBlock: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.container}>
      <AddToCartButton product={product} />

      <AddToFavButton product={product} />
    </div>
  );
};
