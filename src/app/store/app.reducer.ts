import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {productsReducer} from '../shop/store/reducers/products.reducer';
import {cartReducer} from '../shop/store/reducers/cart.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  products: productsReducer,
  cart: cartReducer
};

