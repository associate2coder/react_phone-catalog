import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import cn from 'classnames';
import { ActionButton } from '../ActionButton';
import { useEffect, useState } from 'react';
import { Logo } from '../Logo';
import { footerLinks } from './footerLinks';

export const Footer: React.FC = () => {
  const [hasScroll, setHasScroll] = useState(window.scrollY !== 0);

  useEffect(() => {
    const handleScroll = () => {
      setHasScroll(window.scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={cn('footer', styles.footer)}>
      <div className={styles.wrapper}>
        <Logo />

        <div className={styles.links}>
          {footerLinks.map(link => (
            <Link
              to={link.href}
              className={cn('upper-case', styles.link)}
              target="_blank"
              key={`${link.title}-${link.id}`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className={styles.navigation}>
          {hasScroll && (
            <>
              <span className="small-text">Back to top</span>
              <ActionButton
                type="scrollUp"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
