import {Injectable} from '@angular/core';
import {Condition, Operator, PromoRule, PromoType} from './promo-rule.model';
import {Product} from '../product/product.model';
import {CartState} from '../store/state/cart.state';
import {Dictionary} from '@ngrx/entity';
import {CartItem} from './cart-item.model';
import {ProductsState} from '../store/state/products.state';
import {of} from 'rxjs';

export const promoCodeDic = {
  'RRD4D32': {
    code: 'RRD4D32',
    applicable: false,
    type: PromoType.TotalPrice,
    condition: {
      operator: Operator.GreaterThan,
      unit: 1000
    },
    onPrice: {
      discountRate: 0.1
    }
  },
  '44F4T11': {
    code: '44F4T11',
    applicable: false,
    type: PromoType.TotalPrice,
    condition: {
      operator: Operator.GreaterThan,
      unit: 1500
    },
    onPrice: {
      discountRate: 0.15
    }
  },
  'FF9543D1': {
    code: 'FF9543D1',
    applicable: false,
    type: PromoType.OnProduct,
    condition: {
      operator: Operator.GreaterThanEq,
      unit: 10
    },
    onProduct: {
      refProductId: 'docgen',
      onProductId: 'docgen',
      promoPrice: 8.99
    }
  },
  'YYGWKJD': {
    code: 'YYGWKJD',
    applicable: false,
    type: PromoType.OnProduct,
    condition: {
      operator: Operator.GreaterThanEq,
      unit: 1
    },
    onProduct: {
      refProductId: 'wf',
      onProductId: 'form',
      promoPrice: 89.99
    }
  }
};
@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {

  constructor() {
  }

  validatePromo(rule: PromoRule, productState: ProductsState, cartState: CartState): PromoRule {
    if (rule.type === PromoType.OnProduct) {
      return this.validateProductBasedPromo(rule, cartState.entities);
    }

    return this.validateTotalPurchasedPromo(rule, cartState.entities, productState.entities);
  }

  private validateProductBasedPromo(rule: PromoRule, cartEntities: Dictionary<CartItem>): PromoRule {
    const refProduct = cartEntities[rule.onProduct.refProductId];
    const targetProduct = cartEntities[rule.onProduct.onProductId];

    if (!refProduct || !targetProduct || !this.isEligibleForPromo(rule.condition, refProduct.quantity)) {
      return this.setRuleValidity(rule, false);
    }

    return this.setRuleValidity(rule, true);
  }

  private validateTotalPurchasedPromo(rule: PromoRule, cartEntities: Dictionary<CartItem>
                                         , productEntities: Dictionary<Product>): PromoRule {

   const total = Object.values(cartEntities).map(c => c.quantity * productEntities[c.productId].price)
     .reduce((price1, price2) => {
       return price1 + price2;
    });

    return this.setRuleValidity(rule, this.isEligibleForPromo(rule.condition, total));
  }

  get(code: string) {
    return of(promoCodeDic[code]);
  }

  private isEligibleForPromo(condition: Condition, comparer: number): boolean {
    switch (condition.operator) {
      case Operator.GreaterThan : {
        return comparer > condition.unit;
      }
      case Operator.GreaterThanEq : {
        return comparer >= condition.unit;
      }
      default :
        return false;
    }
  }

  private setRuleValidity(rule: PromoRule, isValid: boolean) {
    return Object.assign({}, rule, {applicable: isValid});
  }

}
