import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

export class PageHome {

  constructor() {
  }

  getTitle() {
    return browser.getTitle();
  }

  navigateTo(href) {
    element(by.css('a[href="' + href + '"]')).click();
    return browser.waitForRouterComplete();
  }
}
