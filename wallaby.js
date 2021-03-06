var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'test/unit/setup.ts', load: false}
    ],
    tests: [
      {pattern: 'test/unit/**/*.spec.ts', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
