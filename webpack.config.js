const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('path')
var Visualizer = require('webpack-visualizer-plugin')

const appSrc = resolve(__dirname, 'src')
const appDist = resolve(__dirname, 'dist')
const appIndexJs = resolve(appSrc, 'index.js')

const webpackConfig = {

  entry: {
    app: appSrc,
  },

  output: {
    // the build folder.
    path: appDist,
    // generated JS file names (with nested folders).
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[chunkhash:8].js',
  },

  // generate sourcemaps in production. This is slow but gives good results
  // you can exclude the *.map files from the build during deployment
  devtool: 'source-map',

  module: {
    rules: [
      // process js with babel
      {
        test: /\.js$/,
        include: appSrc,
        loader: 'babel',
      }
    ],
  },

  plugins: [

    // remove dist directory
    new CleanWebpackPlugin(appDist),

    // generate deterministic chunk hashes based on file contents
    new webpack.HashedModuleIdsPlugin(),

    // extract vendor chunk
    // https://jeremygayed.com/dynamic-vendor-bundling-in-webpack-528993e48aab#.jrtpk3y9z
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),

    // generate a 'manifest' chunk to be inlined in the HTML template
    new webpack.optimize.CommonsChunkPlugin('manifest'),

    new Visualizer()
  ],
}

module.exports = webpackConfig

