import {by, element} from 'protractor';
import {
  applyPromoCodeBtnCssSelector,
  grandTotalPriceCssSelector,
  originalPriceCssSelector,
  productNameCssSelector, promoCodeInputCssSelector,
  quantityCssSelector, totalDiscountPriceCssSelector, totalPreDiscountPriceCssSelector, totalPriceCssSelector
} from '../../src/app/test-helper/cart-summary-selector';


export class CartSummaryPage {

  getProductPropsById(id: string) {
    const productEl = element(by.css(`#${id}`));
    return {
      name: productEl.$(productNameCssSelector).getText(),
      quantity: productEl.$(quantityCssSelector).getText(),
      originalPrice: productEl.$(originalPriceCssSelector).getText(),
      totalPrice: productEl.$(totalPriceCssSelector).getText()
    };
  }

  getTotalPreDiscountPrice() {
    return element(by.css(totalPreDiscountPriceCssSelector)).getText();
  }

  getTotalDiscountEl() {
    return element(by.css(totalDiscountPriceCssSelector));
  }

  getGrandTotalPrice() {
    return element(by.css(grandTotalPriceCssSelector)).getText();
  }

  getPromoCodeInput() {
    return element(by.css(promoCodeInputCssSelector));
  }

  getApplyPromoCodeButton() {
    return element(by.css(applyPromoCodeBtnCssSelector));
  }

  getContinueBtn() {
    return element(by.css('#continue-btn'));
  }
}
