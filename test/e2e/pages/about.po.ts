import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

import { PageObject } from './page-object';

export class PageAbout extends PageObject {

  constructor() {
    super('about');
  }

  setFirstname(value) {
    let firstName = element(by.valueBind('firstName'));
    return firstName.clear().then(() => firstName.sendKeys(value));
  }

  pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  openAlertDialog() {
    return browser.wait(async () => {
      await this.pressSubmitButton();

      await browser.wait(ExpectedConditions.alertIsPresent(), 5000);

      return browser.switchTo().alert().then(
        // use alert.accept instead of alert.dismiss which results in a browser crash
        function (alert) { alert.accept(); return true; },
        function () { return false; }
      );
    });
  }
}