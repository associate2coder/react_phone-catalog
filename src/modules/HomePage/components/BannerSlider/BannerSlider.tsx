import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '../../../../shared/components/Icon';

import { banners } from '../../config/banners';
import { useCurrentMediaType } from '../../../../store/hooks';
import styles from './BannerSlider.module.scss';
import { Link } from 'react-router-dom';

export const BannerSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const mediaType = useCurrentMediaType();

  const totalBanners = banners.length;

  // to achieve 'infinite slider logic':
  // last banner is added to the beginning
  // first banner is added to the end
  const visibleBanners = [banners[totalBanners - 1], ...banners, banners[0]];

  // handling basic slider scroll to a particular index
  const move = (i: number) => {
    const slider = sliderRef.current as HTMLDivElement;
    const childWidth =
      slider.children[0].scrollWidth + (parseInt(slider.style.gap, 10) || 0);
    const targetScrollLeft = i * childWidth;

    slider.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  };

  // Handling overall infinite slider moving logic
  const handleMove = (left: boolean) => {
    // setting variables
    const slider = sliderRef.current as HTMLDivElement;
    const childWidth =
      slider.children[0].scrollWidth + (parseInt(slider.style.gap, 10) || 0);
    const nextIndex = left ? index - 1 : index + 1;

    // moving slider
    move(nextIndex);

    // handling slide substitution to achieve 'infinite slider' logic
    // index is set for index buttons below the banners
    // timeout should cover completion of smooth scroll
    // slides are substituted after timeout
    if (nextIndex === totalBanners + 1) {
      // scrolling after the 'last' banner
      setTimeout(() => {
        slider.scrollLeft = childWidth;
      }, 700);
      setIndex(1);
    } else if (nextIndex === 0) {
      // scrolling before the 'first' banner
      setTimeout(() => {
        slider.scrollLeft = totalBanners * childWidth;
      }, 700);
      setIndex(totalBanners);
    } else {
      // scrolling banners within initial scope
      setIndex(nextIndex);
    }
  };

  // change banners with the set interval
  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(false);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderNavigationButton}
          key={`${mediaType}-1`}
          onClick={() => handleMove(true)}
        >
          <Icon configKey="left" />
        </div>

        <div className={styles.slider} ref={sliderRef}>
          {visibleBanners.map((banner, i) => (
            <Link
              key={`${banner.id}-${banner.order}-${i}`}
              to={banner.href}
              className={styles.link}
            >
              <img
                src={banner[mediaType]}
                alt={`${banner.id}`}
                className={styles.banner}
              />
            </Link>
          ))}
        </div>

        <div
          className={styles.sliderNavigationButton}
          key={`${mediaType}-2`}
          onClick={() => handleMove(false)}
        >
          <Icon configKey="right" />
        </div>
      </div>

      <div className={styles.buttons}>
        {/* First and last button are hidden as their respective banners
            are used purely for transition purposes.  */}
        {visibleBanners.map((banner, i) => {
          const hidden = i === 0 || i === totalBanners + 1;

          return (
            <div
              className={cn(styles.button, { [styles.hidden]: hidden })}
              key={`${banner}-${i}`}
              onClick={() => {
                move(i);
                setIndex(i);
              }}
            >
              <div
                className={cn(styles.icon, {
                  [styles.iconActive]: index === i,
                })}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
