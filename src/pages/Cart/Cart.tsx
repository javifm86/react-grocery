import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardBasket, {
  ItemUpdated,
} from '../../components/ProductCardBasket/ProductCardBasket';
import EmptyCart from '../../components/svg/EmptyCart';
import { Product } from '../../models/product.model';
import { RootState } from '../../store';
import { productActions } from '../../store/product-slice';
import productService from '../../services/products';
import classes from './Cart.module.css';
interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const updatedNumItems = (result: ItemUpdated, productBasket: Product) => {
    console.log({ result });
    const valItem = Number(result.val);
    let finalValue: number | undefined;

    if (result.val != null && Number.isInteger(valItem)) {
      finalValue = valItem;
    }
    dispatch(
      productActions.updateNumItems({
        id: productBasket.id,
        newValue: finalValue,
      })
    );

    if (!result.error) {
      if (result.val === 0) {
        dispatch(productActions.removeFromCart(productBasket));
      } else {
        updateTotal();
      }
    } else {
      setError(true);
    }
    checkErrorInBasket();
  };

  const checkErrorInBasket = useCallback(() => {
    const hasError =
      cart.find((element) => element.numItems === undefined) != null;
    if (hasError) {
      setError(true);
    }
  }, [cart]);

  const updateTotal = useCallback(() => {
    checkErrorInBasket();
    if (error) {
      return;
    }
    const totalCart = cart.reduce((current, value) => {
      if (value.numItems) {
        return (current += value.numItems * value.price);
      }
      return current;
    }, 0);
    setTotal(totalCart);
  }, [cart, checkErrorInBasket, error]);

  const makePayment = () => {
    const petitions = cart.map((product) => {
      if (product.numItems === undefined) {
        return Promise.resolve();
      }
      return productService.updateProduct(product.id, {
        stock: String(product.stock - product.numItems),
      });
    });
    Promise.allSettled(petitions).then(() => {
      dispatch(productActions.paymentReceived());
    });
  };

  useEffect(() => {
    updateTotal();
  }, [cart, updateTotal]);

  useEffect(() => {
    if (error) {
      setTotal(0);
    }
  }, [error]);

  return (
    <div className="h-screen flex flex-col w-full">
      <div
        className={`overflow-y-auto px-4 py-8 flex flex-col ${
          cart.length === 0 ? 'h-full' : classes.productContainer
        }`}
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-900 leading-tight flex justify-center items-center mt-4 mb-12">
          <Link to="/" className="inline lg:hidden mr-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 256 512"
            >
              <path d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" />
            </svg>
          </Link>
          <span className="mr-auto lg:mr-0">Cart</span>
        </h2>

        {/* Cart items list */}
        {cart.length > 0 && (
          <div className="flex flex-wrap mb-8">
            {cart.map((item) => {
              return (
                <article
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-full mb-8 px-4"
                >
                  <ProductCardBasket
                    description={item.productDescription}
                    disable={false}
                    img={item.image_url}
                    name={item.productName}
                    numItems={item.numItems}
                    numItemsUpdated={(result: ItemUpdated) => {
                      updatedNumItems(result, item);
                    }}
                    price={item.price}
                    stock={item.stock}
                    key={item.id}
                  />
                </article>
              );
            })}
          </div>
        )}

        {/* Template empty shows a long svg image */}
        {cart.length === 0 && (
          <div>
            <EmptyCart />
            <div className="text-center">
              <div className="text-center text-3xl font-bold text-gray-700 mb-2">
                Your cart is empty
              </div>
              <div className="text-gray-600 text-xl mb-4">
                Start adding some products
              </div>
              <Link
                to="/"
                className="lg:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-center text-xl"
              >
                Add products
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Total amount and make payment*/}
      {cart.length > 0 && (
        <div className="px-8 my-auto">
          <div className="text-2xl font-semibold flex justify-around items-center mb-6">
            <span>Total amount</span>
            <span className="font-bold">{total} $</span>
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center text-xl"
            onClick={makePayment}
          >
            Make payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
