const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin')

const routes = ['/']

module.exports = {

  devtool: 'source-map',

  entry: {
    main: path.resolve('./src/index.js')
  },

  output: {
    filename: 'package.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'standard'
      }
    ],
    loaders: [
      {
        // this tests for these specific node modules which are not transpiled already
        // and transpiles them for us
        test: /\/node_modules\/(joi\/lib\/|isemail\/lib\/|hoek\/lib\/|topo\/lib\/)/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loaders: ['babel']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?module&sourceMap&localIdentName=[path][name]---[local]---[hash:base64:5]!sass?module&sourceMap&localIdentName=[path][name]---[local]---[hash:base64:5]')
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      },
      {
        test: /\.json$/,
        include: path.resolve('./src'),
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    modulesDirectories: [
      'src',
      'src/components',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },

  node: {
    net: 'empty',
    tls: 'empty',
    crypto: 'empty',
    dns: 'empty'
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new StaticSiteGeneratorPlugin('main', routes),
    new SitemapPlugin('http://benjamintatum.com', routes, 'sitemap.xml'),
    new webpack.NormalModuleReplacementPlugin(/^(net|dns|crypto)$/, function () { return {} }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
        'DEVELOPMENT': JSON.stringify(process.env.DEVELOPMENT),
        'DEVTOOLS': JSON.stringify(process.env.DEVTOOLS),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'AUDIENCE': JSON.stringify(process.env.AUDIENCE),
        'GOOGLE_MAPS_APIKEY': JSON.stringify(process.env.GOOGLE_MAPS_APIKEY)
      }
    })
  ]
}
