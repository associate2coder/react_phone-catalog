import React from 'react';
import cn from 'classnames';

import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { Theme } from '../../types/Theme';
import { useAppSelector } from '../../../store/hooks';

export const Logo: React.FC = () => {
  const theme: Theme = useAppSelector(state => state.theme);

  return (
    <Link to="/" className={cn('logo', styles.logo)}>
      <img
        className={styles.image}
        src={`logo/${theme}/logo.svg`}
        alt="Nice Gadgets logo"
      />
    </Link>
  );
};
