const dotEnv = require('dotenv');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

/**
 * Webpack Plugins
 */
const HtmlPlugin = require('html-webpack-plugin');

/*
 * Local Imports
 */
const commonConfigFactory = require('./webpack.common.js');
const helpers = require('./helpers');

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
  NODE_ENV: 'development',
  API_URL: '',
};

/**
 * The name of the folder where the compiled code will go.
 * @type {string}
 */
const distFolder = 'dist-dev';

const commonConfig = commonConfigFactory(false);

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  // More info: https://webpack.github.io/docs/build-performance.html#sourcemaps and
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',

  entry: {
    main: [
      'react-hot-loader/patch',
      helpers.root('src/index.tsx'), // Defining path seems necessary for this to work consistently on Windows machines.
    ]
  },

  stats: 'errors-only',

  devServer: {
    contentBase: helpers.root(distFolder),
    hot: true,
    port: 5000,
    historyApiFallback: true,
    stats: 'minimal',
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: helpers.root(distFolder),

    // Use absolute paths to avoid the way that URLs are resolved by Chrome when they're parsed from a
    // dynamically loaded CSS blob. Note: Only necessary in Dev.
    publicPath: '/',

    filename: 'main.bundle.[hash].js',

    sourceMapFilename: '[file].map',

    chunkFilename: '[id].chunk.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARS),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlPlugin({
      template: helpers.root('src/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      env: ENVIRONMENT_VARS.NODE_ENV,
    }),
  ],
});
