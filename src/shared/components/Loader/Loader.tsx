import React from 'react';
import styles from './Loader.module.scss';
import cn from 'classnames';

export const Loader: React.FC = () => {
  return (
    <div className={cn(styles.loader, 'overlay', styles.loaderOverlay)}>
      <div className={styles.spinner}></div>
    </div>
  );
};
