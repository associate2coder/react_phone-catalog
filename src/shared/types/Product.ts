import { ProductDetails } from './ProductDetails';

export interface Product
  // eslint-disable-next-line prettier/prettier, max-len
  extends Pick<ProductDetails, 'category' | 'name' | 'screen' | 'capacity' | 'color' | 'ram'> {
  id: number;
  itemId: ProductDetails['id'];
  fullPrice: ProductDetails['priceRegular'];
  price: ProductDetails['priceDiscount'];
  year: number;
  image: string;
}
