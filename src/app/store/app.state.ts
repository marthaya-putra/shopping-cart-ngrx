import {ProductsState} from '../shop/store/state/products.state';
import {CartState} from '../shop/store/state/cart.state';

export interface AppState {
  products: ProductsState;
  cart: CartState;
}
