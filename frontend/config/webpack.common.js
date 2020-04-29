/* eslint-disable no-sync, no-useless-escape */

const envSetup = process.env; // eslint-disable-line no-process-env

/**
 * Webpack Plugins
 */
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Local Imports
 */
const helpers = require('./helpers');

/**
 * Gets the common webpack config.
 *
 * @param {boolean=} isProd
 * @returns {{}}
 */
module.exports = function commonConfigFactory(isProd) {
  const shouldExtractCss = envSetup.DISABLE_HMR_CSS || isProd;

  const extractCssPlugins = [];
  const extractCssLoaders = [];
  if (shouldExtractCss) {
    // Generates an external css file which loads the page faster, but disables hot reloading for css.
    extractCssPlugins.push(
      new MiniCssExtractPlugin({
        filename: (isProd) ? '[name].[contenthash].css' : '[name].css',
      })
    );
    extractCssLoaders.push(MiniCssExtractPlugin.loader);
  }

  // Copy favicon files to the root.
  const copyFiles = [
    'src/assets/favicon/favicon.ico',
  ];

  const copyFilesPlugins = [
    new CopyPlugin(copyFiles.map((filePath) => {
      return {from: helpers.root(filePath)};
    }))
  ];

  /**
   * Webpack Config
   */
  return {
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],

      modules: [
        helpers.root('src'),
        'node_modules',
      ],
    },

    // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    target: 'web',

    plugins: [
      ...extractCssPlugins,
      ...copyFilesPlugins,
    ],

    module: {
      rules: [
        {
          // Loaders for javascript.
          test: /\.jsx?$/,
          include: [
            helpers.root('src')
          ],
          use: [
            {loader: 'babel-loader'},
            {loader: 'eslint-loader'},
          ],
        }, {
          test: /\.tsx?$/,
          include: [
            helpers.root('src')
          ],
          use: [
            {loader: 'babel-loader'},
            {loader: 'eslint-loader'},
          ],
        }, {
          // Loaders for SASS.
          test: /\.scss$/,
          use: [
            {loader: 'style-loader'},
            ...extractCssLoaders,
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  // helpers.root('node_modules'),
                  helpers.root('src/styles/scss'),
                ]
              }
            },
          ],
        }, {
          // Loaders for CSS.
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            ...extractCssLoaders,
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
          ],
        }, {
          test: /\.eot(\?v=\d+.\d+.\d+)?(\?[^\/]*)?$/,
          use: [{loader: 'file-loader'}],
        }, {
          test: /\.woff2?(\?v=\d+.\d+.\d+)?(\?[^\/]*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff',
              },
            }
          ],
        }, {
          test: /\.ttf(\?v=\d+.\d+.\d+)?(\?[^\/]*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
              },
            }
          ],
        }, {
          test: /\.svg(\?v=\d+.\d+.\d+)?(\?[^\/]*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 10000,
                mimetype: 'image/svg+xml',
              },
            }
          ],
        }, {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
          ],
        }, {
          test: /\.ico$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
          ],
        }, {
          test: /\.pdf$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
          ],
        }, {
          test: /\.(webm|ogg|mp4)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
          ],
        }, {
          // Inject jQuery into 3rd party dependencies.
          test: /bootstrap\.bundle(\.min)?\.js$/,
          use: [
            {
              loader: 'imports-loader?jQuery=jquery&$=jquery'
            }
          ]
        }
      ]
    }
  };
};
