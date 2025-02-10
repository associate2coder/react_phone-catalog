import React from 'react';
import { Skeleton } from '../../../../shared/components/Skeleton';
import mainStyles from '../CartProduct/CartProduct.module.scss';
import styles from './CartProductSkeleton.module.scss';

export const CartProductSkeleton: React.FC = () => {
  return (
    <div className={mainStyles.item}>
      <div className={mainStyles.block}>
        <Skeleton width="10%" square={true} />

        <div className={styles.columnWrapper}>
          <Skeleton width="100%" height="20px" />
          <Skeleton width="100%" height="20px" />
        </div>
      </div>
    </div>
  );
};
