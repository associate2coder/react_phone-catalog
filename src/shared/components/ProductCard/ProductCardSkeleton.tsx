import { Skeleton } from '../Skeleton';
import styles from './ProductCard.module.scss';
import cn from 'classnames';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={cn(styles.card)}>
      <Skeleton width="calc(60%)" square={true} />
      <Skeleton width="100%" height="30px" />
      <Skeleton width="40%" height="30px" />
      <Skeleton width="100%" height="15px" />
      <Skeleton width="100%" height="15px" />
      <Skeleton width="100%" height="15px" />
      <Skeleton width="80%" height="30px" />
    </div>
  );
};
