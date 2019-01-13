import {browser} from 'protractor';

export class AppPage {

  static navigateTo(destination: string) {
    return browser.get(destination);
  }
}
