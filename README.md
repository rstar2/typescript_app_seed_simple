## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=4.0* with NPM 3.

From the project folder, execute the following commands:

```shell
npm install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally. 

To run the app execute the following command:

```shell
npm start
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at http://localhost:9000. Changes in the code
will automatically build and reload the app.

## Feature configuration

Most of the configuration will happen in the `webpack.config.js` file.
There, you may configure advanced loader features or add direct SASS or LESS loading support.

## Bundling

To build a development bundle (output to /dist) execute:

```shell
npm run build
```

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm run build:prod
```

To test either the development or production build execute:

```shell
npm run server:prod
```

The production bundle includes all files that are required for deployment.

## Running The Unit Tests

To run the unit tests:

```shell
npm test
```

## Running The E2E Tests
Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e/src```

2. Run the tests by invoking

  ```shell
  npm run e2e
  ```

### Running e2e tests manually

1. Make sure your app runs and is accessible

  ```shell
  WEBPACK_PORT=19876 npm start
  ```

3. Once bundle is ready, run the E2E-Tests in another console

  ```shell
  npm run e2e:start
  ```

## Acknowledgments

Parts of code responsible for Webpack configuration were inspired by or copied from @AngularClass' [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).
