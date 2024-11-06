const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@apps': path.resolve(__dirname, 'src/apps'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
};

const serverConfig = {
  ...commonConfig,
  name: 'server',
  target: 'node',
  entry: './src/server/bootstrap.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: 'bootstrap.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportOnlyLocals: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_SERVER': JSON.stringify(true)
    })
  ],
};

const clientConfig = {
  ...commonConfig,
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/client/bootstrap.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bootstrap.js',
    publicPath: '/public/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_SERVER': JSON.stringify(false)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true,
    }),
  ],
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = [serverConfig, clientConfig];
