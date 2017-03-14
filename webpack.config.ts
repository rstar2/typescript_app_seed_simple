/// <reference path="./node_modules/@types/node/index.d.ts" />
/**
 * To learn more about how to use Easy Webpack
 * Take a look at the README here: https://github.com/easy-webpack/core
 **/
import { generateConfig, get, stripMetadata, EasyWebpackConfig, WebpackConfigWithMetadata } from '@easy-webpack/core';
import * as path from 'path';

import * as envProd from '@easy-webpack/config-env-production';
import * as envDev from '@easy-webpack/config-env-development';
import * as typescript from '@easy-webpack/config-typescript';
import * as html from '@easy-webpack/config-html';
import * as css from '@easy-webpack/config-css';
import * as less from '@easy-webpack/config-less';
import * as fontAndImages from '@easy-webpack/config-fonts-and-images';
import * as globalJquery from '@easy-webpack/config-global-jquery';
import * as generateIndexHtml from '@easy-webpack/config-generate-index-html';
import * as commonChunksOptimize from '@easy-webpack/config-common-chunks-simple';
import * as copyFiles from '@easy-webpack/config-copy-files';
import * as uglify from '@easy-webpack/config-uglify';
import * as generateCoverage from '@easy-webpack/config-test-coverage-istanbul';

const ENV: 'development' | 'production' | 'test' = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development');

// basic configuration:
const title = 'App Seed Simple';
const baseUrl = '/';

const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

/**
 * Main Webpack Configuration
 */
let config = generateConfig(
  {
    entry: {
      'vendor': ['./src/vendor'],
      'app-bootstrap': ['./src/polyfills'],
      'app': ['./src/main']
    },
    output: {
      path: outDir,
    },

    metadata: {
      port: 9090,
      root: rootDir, 
      src: srcDir, 
      
      title, 
      baseUrl
    }
  },

  /**
   * Don't be afraid, you can put bits of standard Webpack configuration here
   * (or at the end, after the last parameter, so it won't get overwritten by the presets)
   * Because that's all easy-webpack configs are - snippets of premade, maintained configuration parts!
   * 
   * For Webpack docs, see: https://webpack.js.org/configuration/
   */

  ENV === 'test' || ENV === 'development' ? 
    envDev(ENV !== 'test' ? {} : {devtool: 'inline-source-map'}) :
    envProd({ /* devtool: '...' */ }),

  typescript(ENV !== 'test' ? {} : { options: { doTypeCheck: false, sourceMap: false, inlineSourceMap: true, inlineSources: true } }),
  html({ exclude: [path.resolve(srcDir, 'index.html')] }),
  css({ filename: 'styles.css', allChunks: true, sourceMap: false }),
  less({ filename: 'styles2.css', allChunks: true, sourceMap: false }),
  fontAndImages(),
  globalJquery(),
  generateIndexHtml({minify: ENV === 'production',
                     overrideOptions: {template: './src/index.html'}}),

  ...(ENV === 'production' || ENV === 'development' ? [
      commonChunksOptimize({appChunkName: 'app', firstChunk: 'app-bootstrap'}),
      copyFiles({patterns: [{ from: './src/favicon.ico', to: 'favicon.ico' }]}),
      copyFiles({patterns: [{ from: './src/assets', to: 'assets' }]})
    ] : [
    /* ENV === 'test' */
    generateCoverage({ options: { esModules: true } })
  ]),

  ENV === 'production' ?
    uglify({debug: false, mangle: { except: ['cb', '__webpack_require__'] }}) : {}
);


// console.log("Metadata:", config.metadata);
module.exports = stripMetadata(config);
