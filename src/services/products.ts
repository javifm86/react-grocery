import http from '../utils/httpCommon';
// import { GetInfo } from './models';

class ProductsService {
  get() {
    return http.get<any>('/grocery');
  }
}

export default new ProductsService();
