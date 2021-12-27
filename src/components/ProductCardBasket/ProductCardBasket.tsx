import {
  FormEvent,
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
interface ProductCardBasketProps {
  img: string;
  stock: number;
  name: string;
  numItems: number | undefined;
  price: number;
  description: string;
  disable: boolean;
  numItemsUpdated: (result: ItemUpdated) => void;
}

export interface ItemUpdated {
  val: number | null;
  error: boolean;
}

const ProductCardBasket: FunctionComponent<ProductCardBasketProps> = (
  props
) => {
  const inputField = useRef<HTMLInputElement>(null);
  const [stockLeft, setStockLeft] = useState(
    props.numItems !== undefined ? props.stock - props.numItems : props.stock
  );
  const [inputCSSClasses, setInputCSSClasses] = useState('border-none');

  const add = () => {
    modifyNumItems(1);
  };
  const substract = () => {
    modifyNumItems(-1);
  };

  const updatedNumItemsHandler = (event: FormEvent<HTMLInputElement>) => {
    updatedNumItems(event.currentTarget.value);
  };

  const updatedNumItems = (val: string) => {
    let valueItem: number | null = null;
    let error = false;
    const isInteger = Number.isInteger(parseFloat(val));

    if (isInteger && !isNaN(Number(val))) {
      valueItem = Number(val);
      error = updateStockLeft(valueItem);
    } else {
      valueItem = null;
      error = true;
      if (inputField.current) {
        inputField.current.value = '';
      }
      setStockLeft(props.stock);
    }

    if (error) {
      setInputCSSClasses('border border-solid border-red-600');
    } else {
      setInputCSSClasses('border-none');
    }

    props.numItemsUpdated({
      val: valueItem,
      error: error,
    });
  };
  const updateStockLeft = useCallback(
    (numItems: number): boolean => {
      if (numItems > props.stock) {
        setStockLeft(0);
        return true;
      }
      if (numItems < 0) {
        setStockLeft(props.stock);
        return true;
      }
      setStockLeft(props.stock - numItems);
      return false;
    },
    [props.stock]
  );

  const modifyNumItems = (num: number): void => {
    let currentVal = inputField.current?.value;
    if (currentVal === undefined) {
      currentVal = '';
    }
    if (Number.isInteger(parseFloat(currentVal))) {
      const result = String(Number(currentVal) + num);
      if (inputField.current) {
        inputField.current.value = result;
      }
      updatedNumItems(result);
    }
  };

  useEffect(() => {
    if (inputField.current) {
      inputField.current.value =
        props.numItems !== undefined ? String(props.numItems) : '';
    }
  }, [props.numItems]);

  useEffect(() => {
    if (inputField.current) {
      updateStockLeft(Number(inputField.current.value));
    }
  }, [props.stock, updateStockLeft]);

  return (
    <div className="border border-gray-400 rounded-lg shadow-md p-4 bg-white flex items-start h-full">
      {/* Product image */}
      <img
        src={props.img}
        alt={props.description}
        className="w-24 mr-4 flex-shrink-0 object-scale-down"
      />

      {/* Product info */}
      <div className="flex-grow">
        <div
          className="font-bold text-base mb-1 text-gray-700"
          data-testid="name"
        >
          {props.name}
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-800 font-bold mb-1" data-testid="price">
            {props.price} €
          </div>
          <div data-testid="stock">{props.stock} in stock</div>
        </div>
        <div className="flex items-center justify-between">
          <form>
            <div className="flex items-center border border-gray-500">
              <button
                className="hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 w-8 text-center"
                type="button"
                onClick={substract}
                disabled={props.disable ? true : false}
                data-testid="substractButton"
              >
                -
              </button>
              <input
                required
                onChange={updatedNumItemsHandler}
                className={`appearance-none text-gray-700 py-1 px-2 leading-tight w-12 text-center ${inputCSSClasses}`}
                type="text"
                data-testid="input"
                disabled={props.disable ? true : false}
                ref={inputField}
              />
              <button
                className="hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 w-8 text-center"
                type="button"
                onClick={add}
                disabled={props.disable ? true : false}
                data-testid="addButton"
              >
                +
              </button>
            </div>
          </form>
          <div data-testid="stockleft">{stockLeft} left</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardBasket;
