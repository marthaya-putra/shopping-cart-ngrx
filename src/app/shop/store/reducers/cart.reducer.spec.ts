import {cartReducer} from './cart.reducer';
import {adapter, initialState} from '../state/cart.state';
import {AddItemToCart} from '../actions/cart.action';
import {Condition, PromoType, Operator} from '../../cart/promo-rule.model';

describe('CartReducer', () => {
  describe('undefined action type', () => {
    it('should return CartItem initialState', () => {
      const result = cartReducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('AddItemToCart action type', () => {

    const wfItem = {
      productId: 'wf',
      quantity: 3
    };

    describe('No Item in the CartItem', () => {
      it('should add an item to cart', () => {
        const result = cartReducer(undefined, new AddItemToCart(wfItem));

        expect(result.entities[wfItem.productId]).toEqual(wfItem);
      });
    });

    describe('CartItem with existing item(s)', () => {
      it('should add another item to cart', () => {
        const state = adapter.addOne(wfItem, initialState);

        const newItem = {
          productId: 'doc',
          quantity: 1
        };
        const result = cartReducer(state, new AddItemToCart(newItem));

        expect(result.ids.length).toEqual(2);
        expect(result.entities[newItem.productId]).toBeTruthy();
      });

      it('should add the quantity of existing item', () => {
        const state = adapter.addOne(wfItem, initialState);
        const newlyAddedItem = {
          productId: 'wf',
          quantity: 1
        };
        const result = cartReducer(state, new AddItemToCart(newlyAddedItem));

        expect(result.entities[wfItem.productId].quantity).toEqual(newlyAddedItem.quantity);
      });
    });

  });

  describe('ApplyPromoCode action type', () => {
    const wfProductId = 'wf';
    const docGenProductId = 'docGen';

    const purchasedWfItem = {
      productId: wfProductId,
      quantity: 3
    };

    const purchasedDocItem = {
      productId: 'docGen',
      quantity: 5
    };

    const productBasedPromoCodeSameProduct = {
      condition: {
        operator: Operator.GreaterThanEq,
        operand: 2
      },
      type: PromoType.OnProduct,
      refProductId: wfProductId,
      onProductId: wfProductId,
      rate: 8.5
    };

    const productBasedPromoCodeDifferentProduct = {
      condition: {
        operator: Operator.GreaterThanEq,
        operand: 3
      },
      type: PromoType.OnProduct,
      refProductId: wfProductId,
      onProductId: docGenProductId,
      rate: 9
    };

  });
});
