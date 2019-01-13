import {by, element} from 'protractor';

export class AcknowledgementPage {
  getProducts() {
    return element(by.css('#products')).getText();
  }

  getPromoCode() {
    return element(by.css('#promo-code')).getText();
  }

  getTotalPrice() {
    return element(by.css('#total-price')).getText();
  }
}
