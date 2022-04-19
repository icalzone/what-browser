const webpack = require('webpack')
const path = require('path')
const package = require('./package.json')
const banner = `${package.name} - Version ${package.version}`

module.exports = {
  entry: './src/index.js',
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: ['SAASDebug']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
