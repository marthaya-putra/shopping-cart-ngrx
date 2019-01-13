import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryComponent} from './cart-summary.component';
import {ShopTestingModule} from '../../shop.module.spec';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {GetProductsSuccess} from '../../store/actions/products.action';
import {availableProducts} from '../../product/product.service';
import {AddItemToCart} from '../../store/actions/cart.action';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {CartItem} from '../cart-item.model';
import {selectGrandTotal, selectGrandTotalPreDiscount} from '../../store/selectors/cart.selector';
import {promoCodeDic} from '../promo-code.service';
import {CurrencyPipe} from '@angular/common';
import {
  applyPromoCodeBtnCssSelector,
  grandTotalPriceCssSelector,
  originalPriceCssSelector,
  productNameCssSelector,
  promoCodeInputCssSelector,
  promoPriceCssSelector,
  quantityCssSelector,
  totalDiscountPriceCssSelector,
  totalPreDiscountPriceCssSelector,
  totalPriceCssSelector
} from '../../../test-helper/cart-summary-selector';

describe('CartSummaryComponent', () => {
  const workflowProductId = availableProducts[0].id;
  const formProductId = availableProducts[2].id;

  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let store$: Store<AppState>;
  let workflowItem: CartItem;
  let formItem: CartItem;
  const pipe: CurrencyPipe = new CurrencyPipe('en');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShopTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store$ = TestBed.get(Store);
    store$.dispatch(new GetProductsSuccess(availableProducts));
  });

  beforeEach(() => {
    workflowItem = {
      productId: workflowProductId,
      quantity: 1
    };

    formItem = {
      productId: formProductId,
      quantity: 2
    };

    store$.dispatch(new AddItemToCart(workflowItem));
    store$.dispatch(new AddItemToCart(formItem));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Page Load', () => {
    it('should display expected summary from items in the cart', () => {
      const workFlowProduct = availableProducts.find(p => p.id === workflowProductId);

      const workFlowEl = fixture.debugElement.query(By.css(`#${workflowProductId}`));
      expect(workFlowEl.nativeElement).toBeTruthy();

      const workFlowProductNameEl = getProductNameEl(workFlowEl);
      expect(workFlowProductNameEl.nativeElement.innerText).toContain(workFlowProduct.name);

      const workFlowPurchasedQtyEl = getQuantityEl(workFlowEl);
      expect(workFlowPurchasedQtyEl.nativeElement.innerText).toContain(workflowItem.quantity);

      const workFlowUnitPriceEl = getUnitPriceEl(workFlowEl);
      expect(workFlowUnitPriceEl.nativeElement.innerText).toEqual(pipe.transform(workFlowProduct.price));

      const workFlowTotalPriceEl = getTotalPriceEl(workFlowEl);
      expect(workFlowTotalPriceEl.nativeElement.innerText)
        .toContain(pipe.transform(workflowItem.quantity * workFlowProduct.price));

      const totalPreDiscountPriceEl = getGrandTotalPreDiscountPrice();
      store$.pipe(select(selectGrandTotalPreDiscount))
        .subscribe(price => {
          expect(totalPreDiscountPriceEl.nativeElement.innerText)
            .toContain(pipe.transform(price));
        });

      const discountPriceEl = getTotalDiscount();
      expect(discountPriceEl).toBeFalsy();

      const grandTotalEl = getGrandTotalPrice();
      store$.pipe(select(selectGrandTotal)).subscribe(price => {
        expect(grandTotalEl.nativeElement.innerText)
          .toContain(pipe.transform(price));
      });

    });
  });

  describe('Apply Promo Code', () => {
    it('should reduce the original product price', () => {
      const promoCode = 'YYGWKJD';
      const promoCodeInputEl = fixture.debugElement.query(By.css(promoCodeInputCssSelector));
      const applyPromoCodeBtnEl = fixture.debugElement.query(By.css(applyPromoCodeBtnCssSelector));

      promoCodeInputEl.nativeElement.value = promoCode;
      fixture.detectChanges();

      applyPromoCodeBtnEl.triggerEventHandler('click', null);
      fixture.detectChanges();

      component.cartSummaryList$.subscribe(() => {
        const formItemEl = fixture.debugElement.query(By.css(`#${formProductId}`));
        const originalPrice = getUnitPriceEl(formItemEl);
        const discountedPrice = getProductPromoPriceEl(formItemEl);

        const expectedPromoPrice = promoCodeDic[promoCode].onProduct.promoPrice;

        expect(discountedPrice).toBeTruthy();
        expect(discountedPrice.nativeElement.innerText).toContain(pipe.transform(expectedPromoPrice));
        expect(originalPrice.nativeElement.classList).toContain('invalid-price');
      });

    });
  });

  function getProductNameEl(fromEl: DebugElement) {
    return fromEl.query(By.css(productNameCssSelector));
  }

  function getQuantityEl(fromEl: DebugElement) {
    return fromEl.query(By.css(quantityCssSelector));
  }

  function getUnitPriceEl(fromEl: DebugElement) {
    return fromEl.query(By.css(originalPriceCssSelector));
  }

  function getProductPromoPriceEl(fromEl: DebugElement) {
    return fromEl.query(By.css(promoPriceCssSelector));
  }

  function getTotalPriceEl(fromEl: DebugElement) {
    return fromEl.query(By.css(totalPriceCssSelector));
  }

  function getGrandTotalPreDiscountPrice() {
    return fixture.debugElement.query(By.css(totalPreDiscountPriceCssSelector));
  }

  function getTotalDiscount() {
    return fixture.debugElement.query(By.css(totalDiscountPriceCssSelector));
  }

  function getGrandTotalPrice() {
    return fixture.debugElement.query(By.css(grandTotalPriceCssSelector));
  }

});


