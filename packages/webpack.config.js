/**
 * ################################
 * DO NOT EDIT, GENERATED BY YEOMAN
 * ################################
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PACKAGE_DIRS = ['form', 'next-apollo', 'system', 'utils', 'layout', 'style', 'component'];

/**
 * Map package names to their respective dist file location.
 *
 * 'form/dist/main.bundle': path.resolve(__dirname, 'form/index.ts'),
 */
const entry = PACKAGE_DIRS.reduce((acc, dir) =>
{
  acc[`${dir}/dist/main.bundle`] = path.resolve(__dirname, `${dir}/index.ts`);
  return acc;
}, {});

/**
 * ['form/dist', 'form/__generated']
 */
const cleanOnceBeforeBuildPatterns = PACKAGE_DIRS.reduce((acc, dir) =>
{
  return acc.concat([`${dir}/dist`, `${dir}/__generated__`]);
}, []);


/**
 * Map all path for module resolution
 * [
 *   path.resolve(__dirname, 'form'),
 *   path.resolve(__dirname, 'form/node_modules'),
 *   // Lerna installs shared packages in project root upstream
 *   path.resolve(__dirname, '../node_modules'),
 * ],
 */
const modules = PACKAGE_DIRS.reduce(
  (acc, dir) =>
  {
    acc.unshift(path.resolve(__dirname, `${dir}/node_modules`));
    acc.unshift(path.resolve(__dirname, `${dir}`));
    return acc;
  },
  [path.resolve(__dirname, '../node_modules')],
);

module.exports = {
  mode: 'development',
  entry,
  target: 'node',
  devtool: false,
  output: {
    path: path.resolve(__dirname),
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: { loader: 'babel-loader' },
      // },
      // Namespace not supported by babel-loader, need ts-loader to handle
      // typescript files
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns,
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // SourceMap fix for Typescript
    // https://github.com/webpack/webpack/issues/7172
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [/.*node_modules.*/],
      namespace: '[file]',
      moduleFilenameTemplate:
        'webpack://[filename]/[resource-path]?[loaders]',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules,
  },
  externals: [
    'styled-components',
    'react',
    'react-dom',
    'antd',
    'formik',
    'yup',
  ],
};