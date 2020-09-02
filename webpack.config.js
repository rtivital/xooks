const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-maps',

  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },

  entry: './src/index.js',

  output: {
    library: 'xooks',
    libraryTarget: 'umd',
    filename: 'lib.js',
  },

  externals: {
    react: 'umd react',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },
};
