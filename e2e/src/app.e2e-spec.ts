import {AppPage} from './app.po';
import {ProductsPage} from './products.po';
import {availableProducts} from '../../src/app/shop/product/product.service';
import {CartSummaryPage} from './cart-summary.po';
import {promoCodeDic} from '../../src/app/shop/cart/promo-code.service';
import {browser, by, element, Key} from 'protractor';
import {CurrencyPipe} from '@angular/common';
import {AcknowledgementPage} from './acknowledgement.po';

describe('workspace-project App', () => {
  const wfProductId = 'wf';
  let productsPage: ProductsPage;
  let cartSummaryPage: CartSummaryPage;
  let acknowledgementPage: AcknowledgementPage;

  const pipe: CurrencyPipe = new CurrencyPipe('en');

  beforeEach(() => {
    productsPage = new ProductsPage();
    cartSummaryPage = new CartSummaryPage();
    acknowledgementPage = new AcknowledgementPage();
  });

  describe('Successful checkout', () => {
    const purchasedQty = 10;
    const promoCode = 'RRD4D32';

    const expectedProduct = availableProducts.find(p => p.id === wfProductId);
    const expectedTotalPrice = expectedProduct.price * purchasedQty;
    const expectedGrandTotalPreDiscountPrice = expectedTotalPrice;
    const expectedTotalDiscountPrice = promoCodeDic[promoCode]
      .onPrice.discountRate * expectedGrandTotalPreDiscountPrice;
    const expectedGrandTotalPrice = expectedGrandTotalPreDiscountPrice - expectedTotalDiscountPrice;

    it('should display available products', () => {
      AppPage.navigateTo('products');
      availableProducts.forEach(product => {
        const props = productsPage.getProductPropsById(product.id);
        expect(props.name).toEqual(product.name);
        expect(props.price).toContain(product.price);
      });

    });

    it('should add product to the cart', () => {
      const inputQty = productsPage.getQuantityInputById(wfProductId);
      inputQty.clear();
      inputQty.sendKeys(purchasedQty);
      inputQty.sendKeys(Key.TAB);
      productsPage.getContinueButton().click();

      const props = cartSummaryPage.getProductPropsById(wfProductId);

      expect(props.name).toEqual(expectedProduct.name);
      expect(props.quantity).toEqual(purchasedQty.toString());
      expect(props.originalPrice).toEqual(pipe.transform(expectedProduct.price));
      expect(props.totalPrice).toEqual(pipe.transform(expectedTotalPrice));
      expect(cartSummaryPage.getTotalPreDiscountPrice())
        .toEqual(pipe.transform(expectedGrandTotalPreDiscountPrice));
      expect(cartSummaryPage.getGrandTotalPrice())
        .toEqual(pipe.transform(expectedGrandTotalPreDiscountPrice));
    });

    it('should apply promo code', () => {
      cartSummaryPage.getPromoCodeInput().sendKeys(promoCode);
      cartSummaryPage.getApplyPromoCodeButton().click();

      browser.wait(cartSummaryPage.getTotalDiscountEl().getWebElement(), 5000);

      expect(cartSummaryPage.getTotalDiscountEl().getText())
        .toEqual(pipe.transform(expectedTotalDiscountPrice));
    });

    it('should display expected order acknowledgement', () => {
      cartSummaryPage.getContinueBtn().click();

      expect(acknowledgementPage.getProducts()).toEqual(`${purchasedQty}x ${wfProductId}`);
      expect(acknowledgementPage.getPromoCode()).toEqual(promoCode);
      expect(acknowledgementPage.getTotalPrice()).toEqual(pipe.transform(expectedGrandTotalPrice));
    });
  });
});

