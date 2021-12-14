import React, { FunctionComponent } from 'react';
import Loading from '../components/Loading/Loading';
interface MainPageProps {}

const MainPage: FunctionComponent<MainPageProps> = () => {
  return (
    <div className="flex">
      {/* Product list section */}
      <section className="flex-1 p-8 h-screen overflow-y-auto">
        {/* Header with title and nav */}
        <header className="flex justify-between items-center py-3 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight inline-flex items-center">
            Favorite Product list
            <a href="/cart" className="inline lg:hidden">
              <span className="sr-only">Go to cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 ml-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 256 512"
              >
                <path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" />
              </svg>
            </a>
          </h1>
          <div className="flex p-1 border bg-gray-200 rounded-md">
            <button type="button" className="px-2 py-1 bg-white rounded shadow">
              <span className="sr-only">Regular product list</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 fill-current"
                aria-hidden="true"
                viewBox="0 0 512 512"
              >
                <path d="M506 114H134a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h372a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm6 154v-24a6 6 0 0 0-6-6H134a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6zm0 160v-24a6 6 0 0 0-6-6H134a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6zM84 120V72c0-6.627-5.373-12-12-12H24c-6.627 0-12 5.373-12 12v48c0 6.627 5.373 12 12 12h48c6.627 0 12-5.373 12-12zm0 160v-48c0-6.627-5.373-12-12-12H24c-6.627 0-12 5.373-12 12v48c0 6.627 5.373 12 12 12h48c6.627 0 12-5.373 12-12zm0 160v-48c0-6.627-5.373-12-12-12H24c-6.627 0-12 5.373-12 12v48c0 6.627 5.373 12 12 12h48c6.627 0 12-5.373 12-12z" />
              </svg>
            </button>
            <button type="button" className="px-2 py-1 rounded">
              <span className="sr-only">Favorite product list</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 fill-current"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Error message */}
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8"
          role="alert"
        >
          <p className="font-bold">An error ocurred</p>
          <p>
            Product list could not be loaded. Please{' '}
            <button className="underline">try again later</button>.
          </p>
        </div>

        {/* Product list and pagination */}

        <div className="flex items-center justify-center text-xl text-gray-700">
          <button
            type="button"
            className="page-button bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 mr-4"
            aria-label="Previous"
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="page-button bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
            aria-label="Next"
          >
            Next &raquo;
          </button>
        </div>

        <div className="h-64 flex justify-center items-center">
          <Loading />
        </div>
      </section>

      {/* Cart section */}
      {/* <section className="hidden lg:inline-flex right-0 bg-gray-200 h-screen overflow-y-auto cart-in-main">
    <app-cart></app-cart>
  </section> */}
    </div>
  );
};

export default MainPage;
