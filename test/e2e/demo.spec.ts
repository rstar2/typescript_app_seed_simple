import { PageHome } from './pages/home.po';
import { PageAbout } from './pages/about.po';

import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

// define our page objects
const pageHome = new PageHome();
const pageAbout = new PageAbout();

describe('Home page', function () {

  beforeEach(() => {
    pageHome.goTo();
  });

  it('should load the page and display the contents', () => {
    expect(pageHome.getContent()).toBe('Home'.toUpperCase());
  });

  it('should refresh properly', (done) => {
    browser.navigate().refresh();
    pageHome.expectAt().then(done, done.fail);
  });

  it('should navigate to "about" page', (done) => {
    pageHome.navigateTo('about');
    expect(pageHome.getContent()).toBe('About'.toUpperCase());
    pageAbout.expectAt().then(done, done.fail);
  });
});

describe('About page', function () {

  beforeEach(() => {
    pageAbout.goTo();
  });

  it('should load the page and display the contents', () => {
    expect(pageAbout.getContent()).toBe('About'.toUpperCase());
  });

  it('should navigate to "home" page', (done) => {
    pageAbout.navigateTo('/');
    expect(pageAbout.getContent()).toBe('Home'.toUpperCase());
    pageHome.expectAt().then(done, done.fail);
  });

  xit('should show alert message when clicking submit button', () => {
    expect(pageAbout.openAlertDialog()).toBe(true);
  });
});
