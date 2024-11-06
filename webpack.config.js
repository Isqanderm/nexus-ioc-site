const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const commonConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@apps': path.resolve(__dirname, 'src/apps')
    },
  }
};

const serverConfig = {
  ...commonConfig,
  target: 'node',
  entry: './src/server/bootstrap.ts',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: 'bootstrap.js'
  }
};

const clientConfig = {
  ...commonConfig,
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/client/bootstrap.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bootstrap.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = [serverConfig, clientConfig]; 