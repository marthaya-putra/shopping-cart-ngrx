import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, CartState} from '../state/cart.state';
import {selectProductEntities} from './product.selector';
import {Product} from '../../product/product.model';
import {PromoRule, PromoType} from '../../cart/promo-rule.model';
import {CartItem} from '../../cart/cart-item.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

const {
  selectAll,
  selectIds
} = adapter.getSelectors(selectCartState);

export const selectCartItems = createSelector(
  selectAll
);
export const selectIsCartEmpty = createSelector(
  selectIds,
  (ids) => ids.length === 0
);

export const selectPromoRule = createSelector(
  selectCartState,
  (state) => state.rule
);

export const selectCartSummaryList = createSelector(
  selectCartState,
  selectProductEntities,
  (state, productEntities) => {
    const keys = Object.keys(state.entities);
    if (keys.length === 0) {
      return [
        {
          product: null,
          finalPrice: null,
          quantity: 0,
          totalPrice: 0
        }
      ];
    }
    return keys.map(
      id => toSummary(state.entities[id], productEntities[id], state.rule)
    );
  }
);

export const selectGrandTotalPreDiscount = createSelector(
  selectCartSummaryList,
  (list) => list.map(
    c => c.finalPrice ? c.finalPrice : c.totalPrice
  ).reduce(
    (price1, price2) => price1 + price2
  )
);

export const selectTotalDiscount = createSelector(
  selectGrandTotalPreDiscount,
  selectPromoRule,
  (grandTotal, rule) => {
    if (!rule || !rule.applicable || rule.type !== PromoType.TotalPrice) {
      return 0;
    }

    return grandTotal * rule.onPrice.discountRate;
  }
);

export const selectGrandTotal = createSelector(
  selectGrandTotalPreDiscount,
  selectTotalDiscount,
  (total, discount) => total - discount
);

export const selectFormattedProductsInCartString = createSelector(
  selectAll,
  (cartItems) => cartItems.map(c => `${c.quantity}x ${c.productId}`).join(', ')
);

function toSummary(cartItem: CartItem, product: Product, rule: PromoRule) {
  const finalPrice = getFinalPrice(product, rule);
  return {
    product: product,
    finalPrice: finalPrice,
    quantity: cartItem.quantity,
    totalPrice: cartItem.quantity * (finalPrice ? finalPrice : product.price)
  };
}

function getFinalPrice(product: Product, rule: PromoRule): number {
  if (!rule || !rule.applicable || rule.type !== PromoType.OnProduct) {
    return null;
  }

  return rule.onProduct.onProductId === product.id ? rule.onProduct.promoPrice : null;
}


