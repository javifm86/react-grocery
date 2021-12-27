import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { Product } from '../../../models/product.model';
import { setProductFavorite } from '../../../store/product-actions';
import { productActions } from '../../../store/product-slice';
interface ProductListProps {
  products: Product[];
}

const ProductList: FunctionComponent<ProductListProps> = ({ products }) => {
  const dispatch = useDispatch();

  const added = (val: boolean, product: Product) => {
    dispatch(productActions.addToCart(product));
  };
  const addedFav = (val: boolean, product: Product) => {
    console.log('addedFav callback:', val);
    dispatch(setProductFavorite(product.id, val));
  };

  return (
    <>
      {products.length > 0 && (
        <div className="flex flex-wrap -mx-2 mb-8">
          {products.map((product) => {
            return (
              <article
                key={product.id}
                className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8"
              >
                <ProductCard
                  key={product.id}
                  img={product.image_url}
                  stock={product.stock}
                  name={product.productName}
                  price={product.price}
                  description={product.productDescription}
                  inBasket={product.inBasket != null ? product.inBasket : false}
                  favorite={product.favorite === '1'}
                  added={(val: boolean) => {
                    added(val, product);
                  }}
                  addedToFav={(val: boolean) => {
                    addedFav(val, product);
                  }}
                ></ProductCard>
              </article>
            );
          })}
        </div>
      )}
      {products.length === 0 && (
        <div
          className="w-full bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
          role="alert"
        >
          <p className="font-bold">No results</p>
          <p>There are no products.</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
