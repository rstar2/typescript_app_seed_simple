import './setup';
import { App } from '../../src/app/app';

describe('the App module', () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

});
