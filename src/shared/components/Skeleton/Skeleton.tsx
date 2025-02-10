import styles from './Skeleton.module.scss';
import cn from 'classnames';

type Props =
  | { square: true; width: string; height?: never }
  | { square: true; height: string; width?: never }
  | { square?: false; width: string; height: string };

export const Skeleton: React.FC<Props> = ({
  width,
  height,
  square = false,
}) => {
  const style: React.CSSProperties = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      className={cn(styles.skeleton, {
        [styles.square]: square,
      })}
      style={style}
    ></div>
  );
};
