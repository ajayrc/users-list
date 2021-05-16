import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display instructions to filter', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Select column to filter');
  });

  it('should display list of users', () => {
    page.navigateTo();
    const allUsers = page.getUsersList();
    allUsers.then((data) => {
      expect(data[0]).toContain('Bret');
      expect(data[1]).toContain('Antonette');
    });
  });

  it('should apply filter on users', () => {
    page.navigateTo();
    page.filterUsers();

    const allUsers = page.getUsersList();
    allUsers.then((data) => {
      expect(data[0]).toContain('Bret');
      expect(data[1]).toBeUndefined();
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
