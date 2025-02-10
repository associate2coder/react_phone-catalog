import { Icon } from '../../Icon';
import styles from './HeaderButton.module.scss';
import cn from 'classnames';

interface Props {
  type: string;
  selected?: boolean;
  hasBorder?: boolean;
  hasShadow?: boolean;
  onClick: (...args: unknown[]) => void;
}
export const HeaderButton: React.FC<Props> = ({
  type,
  selected = false,
  hasShadow = false,
  hasBorder = false,
  onClick,
}) => {
  return (
    <button
      className={cn('button', 'square-button', styles.headerButton, {
        [styles.selected]: selected,
        'no-animation': selected,
        [styles.hasShadow]: hasShadow,
        [styles.hasBorder]: hasBorder,
      })}
      onClick={onClick}
    >
      <Icon configKey={type} />
    </button>
  );
};
