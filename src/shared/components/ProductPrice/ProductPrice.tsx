import styles from './ProductPrice.module.scss';

interface Props {
  price: number;
  oldPrice?: number;
  showOldPrice?: boolean;
}

export const ProductPrice: React.FC<Props> = ({
  price,
  oldPrice,
  showOldPrice = false,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.price}>{`$${price}`}</span>

      {showOldPrice && (
        <span className={styles.oldPrice}>{`$${oldPrice}`}</span>
      )}
    </div>
  );
};
