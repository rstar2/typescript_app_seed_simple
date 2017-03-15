// 'navigo' is with es5 module export , so we have to use require('navigo')
import Navigo = require('navigo');

export class AppRouter {

  // See https://www.npmjs.com/package/navigo
  private router: Navigo;

  constructor() {
    this.router = new Navigo(null, false);
    this.router
      .on({   // adding multiple routes at once
        'products/:id': (params) => {
          // The order of routes adding do matter.
          // The URL which is added earlier and matches wins.
          this.setContent('Products id=' + params.id);
        },
        'products': () => {
          this.setContent('Products List');
        },
        '/user/:id/:action': (params, query) => {
          // If we have http://site.com/user/42/save?answer=yes as a url then 
          // params.id = 42 
          // params.action = save
          // query = answer=yes
          this.setContent('User id=' + params.id + (query ? 'query=' + query : ''));
        },
        '/user/*': () => {
          // This function will be called on every 
          // URL that starts with /user
          this.setContent('User deault');
        }
      })
      .on('*', () => {   // adding single route
        this.setContent('Others');
      })
      .on(() => {  // default/home route
        this.setContent('Home');
      })
      .notFound((query) => {
        // In the case of the default handler and notFound handler 
        // the function receives only query as parameter
        // ... 
        this.setContent('NOTHING TO SHOW');
      });

    // TODO: Hooks API that allows you to run functions before firing a route handler.
    // The hooks object is in the format of:
    // {
    //   before: function (done) { ... done(); }
    //   after: function () { ... }
    // }
    // The before hook accepts a function which you must invoke once you finish your job
    // You may prevent the handler to be resolved in the before hook by invoking done(false)
    let user = { loggedIn: false };
    this.router
      .on('/protected', () => {
        this.setContent('Protected data');
      },
      {
        before: function (done) {
          // doing some async operation or perform a check
          if (!user.loggedIn) {
            done(false);
          } else {
            done();
          }
        },
        after: function () {
          console.log('Data saved.');
        }
      }
      );

    // named routes
    let handler = () => {
      this.setContent('Trip :' + window.location.href);
    };
    this.router.on({
      '/trip/:tripId/edit': { as: 'trip.edit', uses: handler },
      '/trip/save': { as: 'trip.save', uses: handler },
      '/trip/:action/:tripId': { as: 'trip.action', uses: handler }
    });
    console.log(this.router.generate('trip.edit', { tripId: 42 })); // --> /trip/42/edit 
    console.log(this.router.generate('trip.action', { tripId: 42, action: 'save' })); // --> /trip/save/42 
    console.log(this.router.generate('trip.save')); // --> /trip/save 

    // have to run resolve method manually to get the routing works.
    this.router.resolve();
  }

  navigateTo(url = '/', isAbsract = false, isPaused = false) {
    // if needed to update the URL but don't want to resolve the callbacks,
    // e.g. the handler for that path will not be executed.
    if (isPaused) {
      this.router.pause();
    }

    this.router.navigate(url, isAbsract);

    if (isPaused) {
      this.router.resume(); // or this.router.pause(false) 
    }
  }

  private setContent(htmlContent: string): void {
    // TODO: this should be in the App controller
    $('.message').html(htmlContent);
  }
}

export default AppRouter;


