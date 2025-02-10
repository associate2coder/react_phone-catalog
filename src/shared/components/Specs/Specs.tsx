import React from 'react';
import styles from './Specs.module.scss';
import { specsTitle, textSettingsClass } from '../../../config/specsConfig';
import { ProductDetails } from '../../types/ProductDetails';
import cn from 'classnames';
import { Product } from '../../types/Product';

type SpecsType =
  | Pick<ProductDetails, keyof ProductDetails>
  | Pick<Product, keyof Product>;

interface Props {
  specs: SpecsType;
  ancestor: string;
}

type SpecsKey = keyof typeof specsTitle;

export const Specs: React.FC<Props> = ({ specs, ancestor }) => {
  const textSettingsByLocation =
    textSettingsClass[ancestor as keyof typeof textSettingsClass];

  const isProductPageSpecs = ancestor === 'ProductPage';

  return (
    <div
      className={cn(styles.specs, {
        [styles.specsProductCard]: !isProductPageSpecs,
      })}
    >
      {isProductPageSpecs && (
        <div className={styles.titleWrapper}>
          <h3>Tech specs</h3>

          <div className="divider"></div>
        </div>
      )}

      {Object.entries(specs).map(([key, value]) => (
        <div
          key={key}
          className={cn(styles.item, styles[textSettingsByLocation])}
        >
          <span className={styles.key}>{specsTitle[key as SpecsKey]}</span>
          <span className={styles.value}>{`${value}`}</span>
        </div>
      ))}
    </div>
  );
};
