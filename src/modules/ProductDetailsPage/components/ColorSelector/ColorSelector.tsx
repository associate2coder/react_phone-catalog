import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ColorSelector.module.scss';
import { ProductDetails } from '../../../../shared/types/ProductDetails';
import { getHex } from '../../../../shared/utils/productPageHelper';

interface Props {
  product: ProductDetails;
  options: string[];
  prepareModifiedId: (modifiedValue: string) => string;
}

export const ColorSelector: React.FC<Props> = ({
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
          className={cn(styles.option, {
            [styles.optionActive]: option === product.color,
          })}
          style={{
            backgroundColor: getHex(option),
          }}
          replace={true}
        ></Link>
      ))}
    </div>
  );
};
