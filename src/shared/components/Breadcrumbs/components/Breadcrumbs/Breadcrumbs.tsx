import React from 'react';
import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Icon } from '../../../Icon';
import { capitalize } from '../../../../utils/helpers';

interface Props {
  productTitle?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ productTitle }) => {
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname
    .split('/')
    .filter(str => str && str !== '#')[0];

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.wrapper}>
        <Icon configKey="home" />
      </Link>

      {category && (
        <>
          <Icon configKey="breadcrumbs" />

          <div className={styles.wrapper}>
            {productId ? (
              <Link
                to={`/${category}`}
                className={cn('small-text', styles.text, styles.link)}
              >
                {capitalize(category)}
              </Link>
            ) : (
              <p className={styles.text}>{capitalize(category)}</p>
            )}
          </div>
        </>
      )}

      {productId && (
        <>
          <Icon configKey="breadcrumbs" />

          <div className={styles.wrapper}>
            <p className={cn('small-text', styles.text)}>
              {productTitle || ''}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
