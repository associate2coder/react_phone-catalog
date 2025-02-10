import React from 'react';
import styles from './PurchaseButton.module.scss';
import cn from 'classnames';

interface Props {
  text: string;
  type: 'addToCart' | 'checkout';
  onClick: (...ags: unknown[]) => void;
  selected?: boolean;
}

export const PurchaseButton: React.FC<Props> = React.memo(
  ({ text, type, onClick, selected = false }) => {
    return (
      <button
        className={cn('button', 'button-text', styles.button, {
          [styles.addToCart]: type === 'addToCart',
          [styles.checkout]: type === 'checkout',
          [styles.inCart]: selected,
        })}
        onClick={onClick}
      >
        {text}
      </button>
    );
  },
);

PurchaseButton.displayName = 'PurchaseButton';
