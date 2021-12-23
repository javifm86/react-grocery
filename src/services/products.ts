import { Product } from '../models/product.model';
import http from '../utils/httpCommon';

export interface UpdateProduct {
  image?: string;
  stock?: string;
  name?: string;
  price?: string;
  description?: string;
  favorite?: string;
}
class ProductsService {
  get() {
    return http.get<Product[]>('/grocery');
  }
  getFavorites() {
    return http.get<Product[]>('/grocery?favorite=1');
  }
  updateProduct(id: string, params: UpdateProduct) {
    return http.patch<Product>(`/grocery/${id}`, { ...params });
  }
}

export default new ProductsService();
