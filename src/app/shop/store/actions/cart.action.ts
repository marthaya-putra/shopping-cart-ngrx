// for simplicity adding/removing CartItem wont go through backend, hence no Effect
import {Action} from '@ngrx/store';
import {CartItem} from '../../cart/cart-item.model';
import {PromoRule} from '../../cart/promo-rule.model';

export enum CartActionType {
  AddItemToCart = '[Cart] Add Item to Cart',
  RemoveItemFromCart = '[Cart] Remove Item from Cart',
  GetPromoCode = '[Cart] Get Promo Code',
  ApplyPromoCode = '[Cart] Apply Promo Code'
}

export class AddItemToCart implements Action {
  readonly type = CartActionType.AddItemToCart;

  constructor(public payload: CartItem) {
  }
}

export class RemoveItemFromCart implements Action {
  readonly type = CartActionType.RemoveItemFromCart;

  constructor(public payload: string) {
  }
}

export class GetPromoCode implements Action {
  readonly type = CartActionType.GetPromoCode;

  constructor(public payload: string) {

  }
}

export class ApplyPromoCode implements Action {
  readonly type = CartActionType.ApplyPromoCode;

  constructor(public payload: PromoRule) {

  }
}

export type CartAction = AddItemToCart | RemoveItemFromCart | GetPromoCode |
  ApplyPromoCode ;
