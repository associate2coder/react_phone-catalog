import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './CapacitySelector.module.scss';
import { ProductDetails } from '../../../../shared/types/ProductDetails';

interface Props {
  product: ProductDetails;
  options: string[];
  prepareModifiedId: (modifiedValue: string) => string;
}

export const CapacitySelector: React.FC<Props> = ({
  product,
  options,
  prepareModifiedId,
}) => {
  return (
    <div className={styles.selectorContainer}>
      {options.map(option => (
        <Link
          key={option}
          to={`/${product.category}/${prepareModifiedId(option)}`}
          className={cn(styles.option, 'body-text', {
            [styles.optionActive]: option === product.capacity,
          })}
          replace={true}
        >
          {option}
        </Link>
      ))}
    </div>
  );
};
