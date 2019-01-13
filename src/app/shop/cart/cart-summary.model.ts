import {Product} from '../product/product.model';

export interface CartSummary {
  product: Product;
  finalPrice?: number;
  quantity: number;
  totalPrice: number;
}
