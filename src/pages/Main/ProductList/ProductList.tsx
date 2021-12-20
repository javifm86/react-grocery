import React, { FunctionComponent } from 'react';
interface ProductListProps {}

const ProductList: FunctionComponent<ProductListProps> = () => {
  return (
    <div className="flex flex-wrap -mx-2 mb-8">
      {/* <ng-container *ngFor="let item of products"> */}
      <article className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8">
        Hi
        {/* <app-product-card
        [img]="item.image_url"
        [stock]="item.stock"
        [name]="item.productName"
        [price]="item.price"
        [description]="item.productDescription"
        [inBasket]="item.inBasket"
        [favorite]="item.favorite === 1 || item.favorite === '1'"
        (added)="addPressed(item);"
        (addedToFav)="addedToFav($event, item);"
      ></app-product-card> */}
      </article>
      {/* </ng-container> */}
    </div>
  );

  {
    /* <ng-template #templateEmpty>
  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
    <p className="font-bold">No results</p>
    <p>There are no products.</p>
  </div>
</ng-template>; */
  }
};

export default ProductList;
