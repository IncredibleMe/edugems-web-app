import { EduGemWebAppPage } from './app.po';

describe('edu-gem-web-app App', function() {
  let page: EduGemWebAppPage;

  beforeEach(() => {
    page = new EduGemWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
