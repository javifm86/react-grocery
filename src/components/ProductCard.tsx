import React, { FunctionComponent } from 'react';
interface ProductCardProps {
  img: string;
  stock: number;
  name: string;
  price: number;
  description: string;
  favorite: boolean;
  inBasket: boolean;
  added: (result: boolean) => void;
  addedToFav: (result: boolean) => void;
}

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
  const favoriteClass = props.favorite ? 'text-red-600' : 'text-white';
  const buttonClasses = props.inBasket
    ? 'bg-green-500 opacity-50 cursor-default'
    : 'bg-blue-500 hover:bg-blue-700';

  const add = () => {
    props.added(true);
  };
  const addFav = () => {
    props.addedToFav(!props.favorite);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-full relative flex flex-col">
      {/* Favorite icon */}
      <button
        className="absolute right-0 mr-4 mt-4 z-10"
        type="button"
        onClick={addFav}
        data-testid="favorite"
      >
        <svg
          className={`${favoriteClass} fill-current `}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Product image */}
      <div className="relative pb-56">
        <img
          className="absolute h-full w-full object-cover"
          src={props.img}
          alt={props.description}
        />
      </div>

      {/* Product info */}
      <div className="pt-4 flex-grow flex flex-col">
        <div
          className="px-6 font-bold text-xl mb-2 text-gray-700"
          data-testid="name"
        >
          {props.name}
        </div>
        <div
          className="px-6 text-gray-800 font-bold text-xl mb-2"
          data-testid="price"
        >
          {props.price} $
        </div>
        <p
          className="px-6 text-gray-700 text-base mb-6 hidden md:inline-flex"
          data-testid="description"
        >
          {props.description}
        </p>

        <div className="flex justify-between items-center mt-auto bg-gray-100 py-4 px-6">
          {props.stock > 0 && <span>{props.stock} left</span>}
          {props.stock === 0 && (
            <span className="text-red-700 py-2 font-bold">Sold out</span>
          )}

          {/*  Add/Added button */}
          {props.stock > 0 && (
            <button
              className={`${buttonClasses} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-flex items-center`}
              onClick={add}
              disabled={props.inBasket}
              data-testid="add"
              type="button"
            >
              {!props.inBasket && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 384 512"
                >
                  <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
                </svg>
              )}
              Add{props.inBasket && 'ed'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
