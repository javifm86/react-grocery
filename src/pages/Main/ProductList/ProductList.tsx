import { FunctionComponent } from 'react';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { Product } from '../../../models/product.model';
interface ProductListProps {
  products: Product[];
}

const ProductList: FunctionComponent<ProductListProps> = ({ products }) => {
  const added = (val: boolean) => {
    console.log('added callback:', val);
  };
  const addedFav = (val: boolean) => {
    console.log('addedFav callback:', val);
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
                  favorite={product.favorite === 1}
                  added={added}
                  addedToFav={addedFav}
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
