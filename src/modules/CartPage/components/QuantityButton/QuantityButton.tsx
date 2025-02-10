import React from 'react';
import cn from 'classnames';
import styles from './QuantityButton.module.scss';
import { Icon } from '../../../../shared/components/Icon';

type QuantityActionType = 'plus' | 'minus';

interface Props {
  type: QuantityActionType;
  onClick: (...args: unknown[]) => void;
}

export const QuantityButton: React.FC<Props> = ({ type, onClick }) => {
  return (
    <button
      className={cn('button', 'square-button', styles.quantityButton)}
      onClick={onClick}
    >
      <Icon configKey={type} />
    </button>
  );
};
