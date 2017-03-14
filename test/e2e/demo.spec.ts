import { PageHome } from './home.po';
import { PageAbout } from './about.po';

import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

// our app is not Angular, so we havce to turn off waiting for Angular by setting
browser.ignoreSynchronization = true;

describe('Home page', function () {
  let poHome: PageHome;
  let poAbout: PageAbout;

  beforeEach(() => {
    poHome = new PageHome();
    poAbout = new PageAbout();

    browser.get(`http://localhost:19876`);
  });

  it('should load the page and display the initial page title', () => {
    expect(poHome.getTitle()).toBe('Welcome');
  });

  it('should display greeting', () => {
    expect(poAbout.getGreeting()).toBe('Welcome to the Navigation App');
  });

  it('should automatically write down the fullname', () => {
    poAbout.setFirstname('Rob');
    poAbout.setLastname('Eisenberg');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(poAbout.getFullname()).toBe('ROB EISENBERG');
  });

  it('should show alert message when clicking submit button', () => {
    expect(poAbout.openAlertDialog()).toBe(true);
  });

  it('should navigate to users page', () => {
    poHome.navigateTo('#/users');
    expect(poHome.getTitle()).toBe('Github Users');
  });
});
