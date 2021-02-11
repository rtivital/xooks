const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-maps',

  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },

  entry: './src/index.ts',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    globalObject: 'this',
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
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
};
