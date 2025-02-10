import { useAppSelector, useCategory } from '../../../store/hooks';
import { ProductSlider } from '../ProductSlider';
import { useMemo } from 'react';
import { promotionGetters } from './promotionHelpers';
import { sliderTitles } from './promotedConfig';

type PromotionType = 'discounted' | 'new' | 'recommended';

interface Props {
  type?: PromotionType;
}

export const PromotedProducts: React.FC<Props> = ({ type = 'recommended' }) => {
  const { items: products, loaded } = useAppSelector(state => state.products);
  const category = useCategory();
  const favItems = useAppSelector(state => state.fav);
  const cartItems = useAppSelector(state => state.cart).map(
    product => product.itemId,
  );

  const getPromotedProducts = promotionGetters[type];
  const sliderTitle = sliderTitles[type];

  const promotedProducts = useMemo(
    () =>
      getPromotedProducts(
        products,
        20,
        [...favItems, ...cartItems],
        category?.name,
      ),
    [cartItems, category, favItems, getPromotedProducts, products],
  );

  return (
    <ProductSlider
      title={sliderTitle}
      products={promotedProducts}
      loaded={loaded}
      showOldPrices={type === 'discounted'}
    />
  );
};
