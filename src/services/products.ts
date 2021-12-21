import { Product } from '../models/product.model';
import http from '../utils/httpCommon';

class ProductsService {
  get() {
    return http.get<Product[]>('/grocery');
  }
}

export default new ProductsService();
