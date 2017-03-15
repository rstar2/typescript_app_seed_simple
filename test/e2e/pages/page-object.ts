import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

// if needed more funcionality (but more connected to Angular) then check protractor-page-objects
// https://github.com/digitil/protractor-page-objects

// const PROTRACTOR_BASE_URL = require('../../protractor.conf').config.baseUrl;

export abstract class PageObject {

  constructor(protected path: string) {

  }

  getPath(): string {
    return this.path;
  }

  getTitle() {
    return browser.getTitle();
  }

  getContent() {
    return element(by.className('message')).getText();
  }

  /**
   * Gog to (e.g. show) this page
   */
  goTo() {
    let url = /*PROTRACTOR_BASE_URL + */this.path;
    console.log('Go to page : ' + url);
    browser.get(url);
  }

  navigateTo(href) {
    console.log('Navigate to href : ' + href);
    element(by.css('a[href="' + href + '"]')).click();
  }

  /* expect methods */

  expectAt(done?: Function) {
    const regex = new RegExp(this.path.replace(/:[\w\-]+/g, '[^\/]+'));

    browser.getCurrentUrl().then(url => {
      console.log('Current Page : ' + url);
      expect(url).toMatch(regex);
      if (done) {
        done();
      }
    });

  }

}