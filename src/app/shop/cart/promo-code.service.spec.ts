import {PromoCodeService} from './promo-code.service';
import {Operator, PromoType} from './promo-rule.model';
import * as fromProduct from '../store/state/products.state';
import * as fromCart from '../store/state/cart.state';

describe('PromoCodeService', () => {
  let service: PromoCodeService;

  beforeEach(() => service = new PromoCodeService());

  describe('validatePromoCode', () => {
    const wfProductId = 'wf';
    const docProductId = 'docgen';

    const productState = fromProduct.adapter.addMany([
      {
        id: wfProductId,
        name: 'Workflow',
        price: 100
      },
      {
        id: docProductId,
        name: 'Workflow',
        price: 50
      }
    ], fromProduct.initialState);

    describe('PromoType.OnProduct', () => {
      const rule = {
        code: 'ONPRODUCTPROMO',
        applicable: false,
        type: PromoType.OnProduct,
        condition: {
          operator: Operator.GreaterThanEq,
          unit: 5
        },
        onProduct: {
          refProductId: wfProductId,
          onProductId: docProductId,
          promoPrice: 35
        }
      };

      it('should set applicable to false when ref product is not found', () => {
        const cartState = fromCart.adapter.addMany([
          {
            productId: docProductId,
            quantity: 6
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeFalsy();
      });

      it('should set applicable to false when target product is not found', () => {
        const cartState = fromCart.adapter.addMany([
          {
            productId: wfProductId,
            quantity: 5
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeFalsy();
      });

      it('should set applicable to false when refProduct qty < rule', () => {
        const cartState = fromCart.adapter.addMany([
          {
            productId: wfProductId,
            quantity: 3
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeFalsy();
      });


      it('should set applicable to true when ref product qty >= rule and target product exists', () => {
        const cartState = fromCart.adapter.addMany([
          {
            productId: wfProductId,
            quantity: 5
          },
          {
            productId: docProductId,
            quantity: 1
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeTruthy();
      });
    });

    describe('PromoType.TotalPrice', () => {
      const rule = {
        code: 'ONPTOTALPROMO',
        applicable: false,
        type: PromoType.TotalPrice,
        condition: {
          operator: Operator.GreaterThan,
          unit: 500
        },
        onPrice: {
          discountRate: 0.2
        }
      };

      it('should set applicable to false when total purchased <= rule', () => {
        const cartState = fromCart.adapter.addMany([
          {
            productId: wfProductId,
            quantity: 5
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeFalsy();
      });

      it('should set applicable to false when total purchased > rule', () => {
        const cartState = fromCart.adapter.addAll([
          {
            productId: wfProductId,
            quantity: 5
          },
          {
            productId: docProductId,
            quantity: 1
          }
        ], fromCart.initialState);

        const promoRule = service.validatePromo(rule, productState, cartState);
        expect(promoRule.applicable).toBeTruthy();
      });

    });

  });
});
