import { PageHome } from './pages/home.po';
import { PageAbout } from './pages/about.po';

import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

// our app is not Angular, so we havce to turn off waiting for Angular by setting
browser.ignoreSynchronization = true;

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
    pageHome.expectAt(done);
  });

  it('should navigate to "about" page', (done) => {
    pageHome.navigateTo('about');
    expect(pageHome.getContent()).toBe('About'.toUpperCase());
    pageAbout.expectAt(done);
  });
});

describe('About page', function () {

  beforeEach(() => {
    pageAbout.goTo();
  });

  it('should load the page and display the contents', () => {
    expect(pageAbout.getContent()).toBe('About'.toUpperCase());
  });

  xit('should automatically write down the fullname', () => {
    pageAbout.setFirstname('Rob');
    pageAbout.setLastname('Eisenberg');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(pageAbout.getFullname()).toBe('ROB EISENBERG');
  });

  xit('should show alert message when clicking submit button', () => {
    expect(pageAbout.openAlertDialog()).toBe(true);
  });

  it('should navigate to "home" page', (done) => {
    pageAbout.navigateTo('/');
    expect(pageAbout.getContent()).toBe('Home'.toUpperCase());
    pageHome.expectAt(done);
  });
});
