import {by, element} from 'protractor';

export class ProductsPage {
  getProductPropsById(id: string) {
    const productEl = this.getProductElById(id);
    const name = productEl.$('.product-name').getText();
    const price = productEl.$('.product-price').getText();

    return {
      name: name,
      price: price
    };
  }

  getQuantityInputById(id: string) {
    const productEl = this.getProductElById(id);
    return productEl.$('input');
  }

  getContinueButton() {
    return element(by.tagName('button'));
  }

  private getProductElById(id: string) {
    return element(by.css(`#${id}`));
  }
}
