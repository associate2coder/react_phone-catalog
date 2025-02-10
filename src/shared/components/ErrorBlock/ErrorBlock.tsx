import { PurchaseButton } from '../PurchaseButton';
import styles from './ErrorBlock.module.scss';
import cn from 'classnames';

interface Props {
  image: string;
  text: string;
  reload?: boolean;
}

export const ErrorBlock: React.FC<Props> = ({
  image,
  text,
  reload = false,
}) => {
  return (
    <div
      className={cn('error', styles.container, {
        [styles.reload]: reload,
      })}
    >
      <img src={image} alt={`"${text}" image`} className={styles.image} />

      <p className="not-found-text">{text}</p>

      {reload && (
        <PurchaseButton
          text="Reload"
          type="checkout"
          onClick={() => window.location.reload()}
        />
      )}
    </div>
  );
};
