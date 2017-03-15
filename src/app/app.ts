import AppRouter from './app-routes';

export class App {

  private router: AppRouter;

  constructor() {
    console.log('App');

    this.router = new AppRouter();
  }

  navigateTo(url = '/', isAbsract = false, isPaused = false) {
    // call the router
    this.router.navigateTo(url, isAbsract, isPaused);
  }

}
