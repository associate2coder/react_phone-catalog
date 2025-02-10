import { ProductPrice } from '../../../../shared/components/ProductPrice';
import { Specs } from '../../../../shared/components/Specs';
import { CapacitySelector } from '../CapacitySelector';
import { ColorSelector } from '../ColorSelector/ColorSelector';
import { getProductId } from '../../../../shared/services/productService';
// eslint-disable-next-line max-len
import { pickProductDetailsFields } from '../../../../shared/utils/productPageHelper';
import { keySpecs } from '../../../../config/specsConfig';
import { ProductDetails } from '../../../../shared/types/ProductDetails';
import styles from './ProductOptions.module.scss';
import { useCallback } from 'react';
import { pageConfig } from '../../../../config/componentConfig';
// eslint-disable-next-line max-len
import { AddButtonsBlock } from '../../../../shared/components/AddButtonsBlock/components/AddButtonsBlock';

interface Props {
  product: ProductDetails;
}

export const ProductOptions: React.FC<Props> = ({ product }) => {
  const mainSpecs = pickProductDetailsFields(product, keySpecs);

  const prepareModificationId = useCallback(
    (modifiedKey: string, modifiedValue: string) => {
      const modifiableData = {
        capacity: product.capacity,
        color: product.color,
      };

      const modifiedValues = Object.entries(modifiableData).map(
        ([key, value]) => {
          return modifiedKey === key ? modifiedValue : value;
        },
      );

      const modificationId = [product.namespaceId, ...modifiedValues]
        .join('-')
        .toLowerCase();

      return modificationId;
    },
    [product.capacity, product.color, product.namespaceId],
  );

  // fetches product id number
  const overallProductId = getProductId(product.id);

  const config = pageConfig.ProductPage.ProductOptions;

  return (
    <div className={styles.productOptions}>
      <div className={styles.selectors}>
        <div className={styles.block}>
          <h5 className={styles.blockTitle}>{config.colorSelector.label}</h5>

          <ColorSelector
            product={product}
            options={product.colorsAvailable}
            prepareModifiedId={(value: string) =>
              prepareModificationId(config.colorSelector.key, value)
            }
          />

          <p className={styles.id}>{`ID: ${overallProductId}`}</p>
        </div>

        <div className="divider"></div>

        <div className={styles.block}>
          <h5 className={styles.blockTitle}>{config.capacitySelector.label}</h5>

          <CapacitySelector
            product={product}
            options={product.capacityAvailable}
            prepareModifiedId={(value: string) =>
              prepareModificationId(config.capacitySelector.key, value)
            }
          />
        </div>

        <div className="divider"></div>
      </div>

      <div className={styles.purchase}>
        <div className={styles.block}>
          <ProductPrice
            price={product.priceDiscount}
            oldPrice={product.priceRegular}
            showOldPrice={true}
          />

          <AddButtonsBlock product={product} />
        </div>

        <div className={styles.block}>
          <Specs specs={mainSpecs} ancestor="ProductCard" />
        </div>
      </div>
    </div>
  );
};
