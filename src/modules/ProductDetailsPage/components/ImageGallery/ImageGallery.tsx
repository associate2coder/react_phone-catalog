import { useCallback, useRef } from 'react';
import styles from './ImageGallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ImageGallery: React.FC<Props> = ({ name, images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((index: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const gap = parseInt(window.getComputedStyle(slider).columnGap || '0');
    const childWidth = slider.children[0].scrollWidth;
    const targetScroll = index * (childWidth + gap);

    slider.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, []);

  const getImageAlt = useCallback(
    (image: string) => {
      return `${name} image ${image.indexOf(image) + 1}`;
    },
    [name],
  );

  return (
    <>
      <div className={styles.featuredContainer} ref={sliderRef}>
        {images.map(image => (
          <div key={image} className={styles.featured}>
            <img src={image} alt={getImageAlt(image)} className={styles.img} />
          </div>
        ))}
      </div>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={getImageAlt(image)}
            className={styles.thumbnail}
            onClick={() => handleMove(index)}
          />
        ))}
      </div>
    </>
  );
};
