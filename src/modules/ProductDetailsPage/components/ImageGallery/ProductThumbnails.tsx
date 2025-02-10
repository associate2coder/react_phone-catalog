// import { useCallback, useRef } from 'react';
// import styles from './ProductThumbnails.module.scss';

// interface Props {
//   images: string[];
//   name: string;
// }

// export const ProductThumbnails: React.FC<Props> = ({ name, images }) => {
//   const getImageAlt = useCallback(
//     (image: string) => {
//       return `${name} image ${image.indexOf(image) + 1}`;
//     },
//     [name],
//   );
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const handleMove = useCallback((index: number) => {
//     const child = (sliderRef.current as HTMLDivElement).children[index];

//     child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.featuredWrapper} ref={sliderRef}>
//         {images.map(image => (
//           <img
//             key={image}
//             src={image}
//             alt={getImageAlt(image)}
//             className={styles.featuredImage}
//           />
//         ))}
//       </div>

//       <div className={styles.thumbnails}>
//         {images.map((image, index) => (
//           <img
//             key={image}
//             src={image}
//             alt={getImageAlt(image)}
//             className={styles.thumbnail}
//             onClick={() => handleMove(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
