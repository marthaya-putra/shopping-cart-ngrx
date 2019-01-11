import {createFeatureSelector} from '@ngrx/store';
import {CartState} from '../state/cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');
