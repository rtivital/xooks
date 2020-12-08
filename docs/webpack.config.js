const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 9087;
const entry = path.join(__dirname, 'src/index.tsx');
const hotEntries = [
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
  entry,
];

const production = process.env.NODE_ENV === 'production';
const mode = production ? 'production' : 'development';
const publicPath = production ? '/xooks' : '/';

const templateContent = ({ htmlWebpackPlugin }) => `
  <!DOCTYPE html>
  <html>
    <head>
      ${htmlWebpackPlugin.tags.headTags}
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="General purpose React hooks collection">
      
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet">
      
      <title>Xooks</title>
    </head>
    <body>
      <noscript>
        Enable JavaScript to use application
      </noscript>
      <div id="app"></div>
      ${htmlWebpackPlugin.tags.bodyTags}
    </body>
  </html>
`;

module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    port,
  },

  optimization: {
    minimize: production,
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
  },

  mode,
  devtool: production ? false : 'eval',
  entry: production ? entry : hotEntries,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less)$/,
        use: [
          mode === 'production'
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath,
                },
              }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData: "@import 'open-color/open-color.less';",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode) }),
    new HtmlWebpackPlugin({ templateContent }),
    new HtmlWebpackPlugin({ templateContent, filename: '404.html' }),
    ...(production
      ? [new MiniCssExtractPlugin({ filename: 'lib.css' })]
      : [new webpack.HotModuleReplacementPlugin()]),
  ],
};
