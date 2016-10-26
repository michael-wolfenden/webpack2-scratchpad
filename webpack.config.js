const { optimize } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const { resolve } = require('path')

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
    new WebpackMd5Hash(),

    // extract vendor chunk
    // https://jeremygayed.com/dynamic-vendor-bundling-in-webpack-528993e48aab#.jrtpk3y9z
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),

    // generate a 'manifest' chunk to be inlined in the HTML template
    new optimize.CommonsChunkPlugin('manifest'),
  ],
}

module.exports = webpackConfig

