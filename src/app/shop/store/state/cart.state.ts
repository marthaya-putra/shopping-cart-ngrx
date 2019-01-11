import {createEntityAdapter, EntityState, EntityAdapter} from '@ngrx/entity';
import {CartItem} from '../../cart/cart-item.model';
import {PromoRule} from '../../cart/promo-rule.model';

export interface CartState extends EntityState<CartItem> {
  rule?: PromoRule;
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>({
  selectId: cart => cart.productId
});

export const initialState = adapter.getInitialState();

