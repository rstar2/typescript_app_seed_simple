
export class App {

  // See https://www.npmjs.com/package/navigo
  private router: Navigo;

  constructor() {
    console.log('App');

    this.router = new Navigo(null, true);
    this.router
      .on({
        'products/:id': function () {
          this.setContent('Products');
        },
        'products': function () {
          this.setContent('About');
        },
        '/user/:id/:action': function (params) {
          // If we have http://site.com/user/42/save as a url then 
          // params.id = 42 
          // params.action = save 
        },
        '/user/*': function () {
          // This function will be called on every 
          // URL that starts with /user 
        },
        '*': function () {
          this.setContent('Home')
        }
      }).notFound(function (query) {
        // In the case of the default handler and notFound handler 
        // the function receives only query as parameter
        // ... 
        this.setContent('NOTHING TO SHOW');
      });

    this.router.resolve();
  }

  private setContent(): void {

  }

  navigateTo(url = '/', isAbsract = false) {
    this.router.navigate(url, isAbsract);
  }
}

new App();
