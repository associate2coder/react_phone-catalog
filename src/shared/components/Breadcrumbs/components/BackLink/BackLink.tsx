import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from '../Breadcrumbs/Breadcrumbs.module.scss';
import { useCallback } from 'react';
import { Icon } from '../../../Icon';

export const BackLink: React.FC = () => {
  const location = useLocation();

  // Fn retrieves previous pathname from saved location state
  // if none (link is copied outside), page will instead be routed to home
  const getReferreer = useCallback(() => {
    const historyState = location.state;

    if (historyState) {
      return historyState.from;
    }

    return '/';
  }, [location.state]);

  return (
    <div className={cn(styles.wrapper, styles.backLink)}>
      <Icon configKey="back" />

      <Link
        to={{
          pathname: getReferreer(),
          search: location.state?.search,
        }}
        className={cn('small-text', styles.text, styles.link)}
      >
        {'Back'}
      </Link>
    </div>
  );
};
