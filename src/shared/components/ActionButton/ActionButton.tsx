import React from 'react';

import cn from 'classnames';
import styles from './ActionButton.module.scss';
import { Icon } from '../Icon';

interface Props {
  type: string;
  inactive?: boolean;
  onClick: (...args: unknown[]) => void;
}

export const ActionButton: React.FC<Props> = ({
  type,
  inactive = false,
  onClick,
}) => {
  return (
    <button
      className={cn('button', 'square-button', styles[`${type}Button`], {
        [styles.inactive]: inactive,
      })}
      onClick={onClick}
    >
      <Icon configKey={type} inactive={inactive} />
    </button>
  );
};
