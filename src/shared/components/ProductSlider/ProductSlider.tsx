import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProductSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { useCurrentMediaType } from '../../../store/hooks';
import { ActionButton } from '../ActionButton';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { MediaType } from '../../types/MediaType';

interface Props {
  title: string;
  products: Product[];
  loaded: boolean;
  showOldPrices?: boolean;
}

const isDesktop = (media: MediaType) => media === MediaType.desktop;

export const ProductSlider: React.FC<Props> = React.memo(
  ({ title, products: recommended, loaded, showOldPrices = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const mediaType = useCurrentMediaType();
    const lastMoveRef = useRef<string>('prev');

    // needed for exclusion of visible indices from scroll
    const calcVisibleIndices = useCallback(() => {
      const slider = sliderRef.current;

      if (!slider) {
        return 0;
      }

      const children = slider.children;

      if (children.length === 0) {
        return 0;
      }

      const gap = parseInt(window.getComputedStyle(slider).gap || '0');
      const childWidth = children[0].scrollWidth + gap;
      const sliderWidth = slider.clientWidth;

      return Math.floor(sliderWidth / childWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaType]);

    const [visibleIndices, setVisibleIndices] = useState(calcVisibleIndices());
    const leftDisabled = currentIndex <= 0;
    const rightDisabled = currentIndex >= recommended.length - 1;

    useEffect(() => {
      setVisibleIndices(calcVisibleIndices());
    }, [calcVisibleIndices, mediaType, sliderRef.current?.clientWidth]);

    // scrolls slider to ensure that
    // child by index is visible
    const move = (index: number) => {
      const options: ScrollIntoViewOptions =
        index > currentIndex
          ? { block: 'nearest', inline: 'end', behavior: 'smooth' }
          : { block: 'nearest', inline: 'start', behavior: 'smooth' };

      sliderRef.current?.children[index].scrollIntoView(options);
    };

    // calculate index for the 'next' button
    const handleNext = () => {
      const adjusment = isDesktop(mediaType) ? 1 : 0;

      // need to store previous state move direction
      // otherwise slider is moving in wrong direction
      const newIndex =
        lastMoveRef.current === 'prev'
          ? currentIndex + visibleIndices + adjusment
          : currentIndex + 1;

      if (currentIndex < recommended.length) {
        lastMoveRef.current = 'next';
        move(newIndex);
        setCurrentIndex(newIndex);
      }
    };

    // calculate index for the 'prev' button
    const handlePrev = () => {
      const adjusment = isDesktop(mediaType) ? 1 : 0;

      // need to store previous state move direction
      // otherwise slider is moving in wrong direction
      const newIndex =
        lastMoveRef.current === 'next'
          ? currentIndex - visibleIndices - adjusment
          : currentIndex - 1;

      if (currentIndex >= 0) {
        lastMoveRef.current = 'prev';
        move(newIndex);
        setCurrentIndex(newIndex);
      }
    };

    const skeletonIds = [1, 2, 3, 4];

    return (
      <div className={styles.slider}>
        <div className={styles.header}>
          <h2>{title}</h2>

          <div className={styles.buttonsContainer}>
            <ActionButton
              type="left"
              inactive={leftDisabled}
              onClick={() => handlePrev()}
            />

            <ActionButton
              type="right"
              onClick={() => handleNext()}
              inactive={rightDisabled}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.productContainer} ref={sliderRef}>
            {loaded &&
              recommended.map(product => (
                <ProductCard
                  product={product}
                  showOldPrice={showOldPrices}
                  key={product.id}
                />
              ))}
            {!loaded &&
              skeletonIds.map(id => (
                <ProductCardSkeleton key={`skeleotn-${id}`} />
              ))}
          </div>
        </div>
      </div>
    );
  },
);

ProductSlider.displayName = 'ProductSlider';
