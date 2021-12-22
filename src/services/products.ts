import { Product } from '../models/product.model';
import http from '../utils/httpCommon';

class ProductsService {
  get() {
    return http.get<Product[]>('/grocery');
  }
  getFavorites() {
    return http.get<Product[]>('/grocery?favorite=1');
  }
}

export default new ProductsService();
