const fs = require('fs')
const path = require('path')
var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    path: path.join(__dirname, '/bin'),
    filename: 'persister.app.js'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx'
      // extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: nodeModules,
  plugins: [  
    new CopyWebpackPlugin([{
      from: 'src/database/sql/**/*.sql',
      to: path.join(__dirname, '/bin')
    }
    ])
  ]
}
