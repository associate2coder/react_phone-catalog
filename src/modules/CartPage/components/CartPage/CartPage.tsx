import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CartProductItem } from '../../types/CartProductItem';
// eslint-disable-next-line max-len
import { BackLink } from '../../../../shared/components/Breadcrumbs/components/BackLink';
import { CartProduct } from '../CartProduct';
import { PurchaseButton } from '../../../../shared/components/PurchaseButton';
import { ErrorBlock } from '../../../../shared/components/ErrorBlock';
import { CartProductSkeleton } from '../CartProductSkeleton';
import { Modal } from '../../../../shared/components/Modal';

import { countCartItems } from '../../utils/countCartItems';
import { clearCart, setItem } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { pages } from '../../../../config/pages';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart);
  const { items: products } = useAppSelector(state => state.products);

  const [cartProducts, setCartProducts] = useState<CartProductItem[]>([]);
  const [loaded, setloaded] = useState(false);
  const [error, setError] = useState('');

  const [checkoutModal, setCheckoutModal] = useState(false);

  // automatic calculation of quantity of items and total sum
  const { totalItems, totalSum } = useMemo(() => {
    return countCartItems(cartProducts);
  }, [cartProducts]);

  // prepare and reuse list of itemIds in different places
  const itemIds = useMemo(() => {
    return cartItems.map(item => item.itemId);
  }, [cartItems]);

  // select respective Products for each itemId in the Cart
  const productsFromCart = useMemo(() => {
    return products.filter(product => itemIds.includes(product.itemId));
  }, [itemIds, products]);

  // add Product to each CartItem
  useEffect(() => {
    try {
      setloaded(false);
      setError('');

      setCartProducts(
        productsFromCart.map(product => {
          const cartItem = cartItems.find(
            item => item.itemId === product.itemId,
          );

          return { ...cartItem, product } as CartProductItem;
        }),
      );
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setloaded(true);
    }
  }, [products, cartItems, productsFromCart]);

  // handling quantity change (add to cart or plus/minus)
  const handleQuantityChange = (newCartProduct: CartProductItem) => {
    const { itemId } = newCartProduct;

    // if quantity is 0, product is removed from the Cart
    const toDelete = newCartProduct.quantity === 0;

    // update quantity in redux store
    dispatch(
      setItem({
        itemId,
        quantity: newCartProduct.quantity,
      }),
    );

    // if quantity is 0, product is removed in page layout
    if (toDelete) {
      setCartProducts(
        cartProducts.filter(product => product.itemId !== itemId),
      );
    }

    // if quantity is non-zero, product will be added or updated
    const target = cartProducts.find(product => product.itemId === itemId);

    // existong product will be updated
    if (target) {
      setCartProducts(
        [...cartProducts].toSpliced(
          cartProducts.indexOf(target),
          1,
          newCartProduct,
        ),
      );
    } else {
      // non-existing product will be added to the Cart
      setCartProducts([...cartProducts, newCartProduct]);
    }
  };

  // handling clearing the Cart
  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    setCheckoutModal(false);
  }, [dispatch]);

  return (
    <div className={cn('page', styles.cartPage)}>
      {!error ? (
        <>
          <header className={styles.pageHeader}>
            <BackLink />

            <h1 className={styles.pageTitle}>{pages.cart.pageTitle}</h1>
          </header>

          {cartItems.length !== 0 ? (
            <>
              <div className={styles.itemList}>
                {loaded &&
                  cartProducts.map(cartProduct => (
                    <CartProduct
                      cartProduct={cartProduct}
                      onQuantityChange={handleQuantityChange}
                      key={cartProduct.itemId}
                    />
                  ))}

                {!loaded &&
                  [1, 2].map(num => (
                    <CartProductSkeleton key={`product-skeleton-${num}`} />
                  ))}
              </div>

              <div className={styles.checkout}>
                <div className={styles.total}>
                  <data value={totalSum} className={styles.sum}>
                    {`$${totalSum || 0}`}
                  </data>

                  <p
                    className={cn('body-text', styles.totalItems)}
                  >{`total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}</p>
                </div>

                <div className="divider"></div>

                <PurchaseButton
                  text="Checkout"
                  type="checkout"
                  onClick={() => setCheckoutModal(true)}
                />
              </div>
            </>
          ) : (
            <ErrorBlock
              image="img/cart-is-empty.png"
              text="Your cart is empty"
            />
          )}
        </>
      ) : (
        <ErrorBlock image="img/error.png" text={error} reload={true} />
      )}

      {checkoutModal && (
        <Modal overlay={true}>
          <div className={styles.confirmationModal}>
            <p>Checkout is not implemented yet.</p>
            <p>Do you want to clear the Cart?</p>
            <div className={styles.buttons}>
              <PurchaseButton
                text="Yes"
                type="checkout"
                onClick={handleClearCart}
              />
              <PurchaseButton
                text="No"
                type="checkout"
                onClick={() => setCheckoutModal(false)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
