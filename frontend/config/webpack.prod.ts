import * as dotEnv from 'dotenv';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

/**
 * Webpack Plugins
 */
import CleanPlugin from 'clean-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';

/*
 * Local Imports
 */
import commonConfigFactory from './webpack.common.js';
import helpers from './helpers';

/**
 * Load the ENV file before doing anything else.
 */
dotEnv.config({
  path: helpers.root('.env'),
});

/**
 * Webpack Environment Variables Config
 */
const ENVIRONMENT_VARS = {
  NODE_ENV: 'production',
  API_URL: '',
};

/**
 * The name of the folder where the compiled code will go.
 * @type {string}
 */
const distFolder = 'dist';

const commonConfig = commonConfigFactory(true);

export default webpackMerge(commonConfig, {
  mode: 'production',

  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  entry: helpers.root('src/index.tsx'),

  output: {
    path: helpers.root(distFolder),
    publicPath: '/',
    filename: 'main.bundle.[contenthash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
  },

  plugins: [
    // Clean the dist folder before generating new files.
    new CleanPlugin(),

    // https://webpack.js.org/plugins/environment-plugin/
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARS),

    // Generate HTML file that contains references to generated bundles.
    // See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlPlugin({
      template: helpers.root('src/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      env: ENVIRONMENT_VARS.NODE_ENV,

      // Note that you can add custom options here if you need to handle other custom logic in index.html
    }),
  ],
});
