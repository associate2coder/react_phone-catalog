import { Product } from '../../../shared/types/Product';
import { CartItem } from './CartItem';

export interface CartProductItem extends CartItem {
  product: Product;
}
