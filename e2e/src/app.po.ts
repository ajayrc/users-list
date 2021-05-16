import { browser, by, element } from 'protractor';

export class AppPage {
  private USERS_LIST_SELECTOR =
    'app-root .users-list-wrapper .users-list tbody tr';

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      by.css('app-root .users .control-panel .select')
    ).getText() as Promise<string>;
  }

  getUsersList(): Promise<string> {
    return element
      .all(by.css(this.USERS_LIST_SELECTOR))
      .getText() as Promise<string>;
  }

  filterUsers(): Promise<string> {
    element(by.id('filterColumn')).sendKeys('User Name');
    element(by.id('filterValue')).sendKeys('Bret');

    return element(
      by.css(this.USERS_LIST_SELECTOR)
    ).getText() as Promise<string>;
  }
}
