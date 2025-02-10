import React from 'react';
import styles from './Counter.module.scss';
import cn from 'classnames';

interface Props {
  count: number;
}

export const Counter: React.FC<Props> = React.memo(({ count }) => {
  return (
    <div className={cn('counter', styles.counter)}>
      <span className={styles.value}>{count}</span>
    </div>
  );
});

Counter.displayName = 'Memo';
