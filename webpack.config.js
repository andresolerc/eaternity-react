const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      {
        test: /\.(jpg|png|ico)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }
    ]
  }
}
