import {adapter, CartState, initialState} from '../state/cart.state';
import {CartAction, CartActionType} from '../actions/cart.action';
import {Condition, Operator} from '../../cart/promo-rule.model';

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.AddItemToCart: {
      return adapter.upsertOne(action.payload, state);
    }
    case CartActionType.RemoveItemFromCart: {
      return adapter.removeOne(action.payload, state);
    }
    case CartActionType.ApplyPromoCode: {
      if (!action.payload.applicable) {
        return state;
      }

      return {
        ... state,
        rule: action.payload
      };
    }

    default :
      return state;
  }
};






