import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}