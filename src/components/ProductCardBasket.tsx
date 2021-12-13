import { FormEvent, FunctionComponent, useRef, useState } from 'react';
interface ProductCardBasketProps {
  img: string;
  stock: number;
  name: string;
  numItems: string;
  price: number;
  description: string;
  favorite: boolean;
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
  const [stockLeft, setStockLeft] = useState(props.stock);

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
      updateStockLeft(valueItem);
    } else {
      valueItem = null;
      error = true;
      if (inputField.current) {
        inputField.current.value = '';
      }
      setStockLeft(props.stock);
    }

    props.numItemsUpdated({
      val: valueItem,
      error: error,
    });
  };
  const updateStockLeft = (numItems: number) => {
    if (numItems > props.stock) {
      setStockLeft(0);
    } else if (numItems < 0) {
      setStockLeft(props.stock);
    } else {
      setStockLeft(props.stock - numItems);
    }
  };

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
        <div className="font-bold text-base mb-1 text-gray-700 test-name">
          {props.name}
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-800 font-bold mb-1 test-price">
            {props.price}
          </div>
          <div className="test-stock">{props.stock} in stock</div>
        </div>
        <div className="flex items-center justify-between">
          <form>
            <div className="flex items-center border border-gray-500">
              <button
                className="hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 w-8 text-center"
                type="button"
                onClick={substract}
              >
                -
              </button>
              <input
                required
                onChange={updatedNumItemsHandler}
                className="appearance-none border-none text-gray-700 py-1 px-2 leading-tight w-12 text-center"
                type="text"
                ref={inputField}
              />
              <button
                className="hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 w-8 text-center"
                type="button"
                onClick={add}
              >
                +
              </button>
            </div>
          </form>
          <div className="test-left">{stockLeft} left</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardBasket;
