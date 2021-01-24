import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import webpack, { Configuration } from 'webpack';
import { PnpWebpackExternals } from '@my-project/service-shared/compiler/lib/webpack/externals/PnpWebpackExternals';
import { HMRServerPlugin } from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/HMRServerPlugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { ProductionServerPlugin } from '@my-project/service-shared/compiler/lib/webpack/plugins/ProductionServer';

export interface IConfigurationOptions {
  dev: boolean;
  debug: boolean;
}

export function configurationFactory(
  {
    workspace,
    sourceDir,
    output,
    entries: {
      main: { fileName }
    },
    configFiles
  }: ICompilerOptions,
  { debug, dev }: IConfigurationOptions
): Configuration {
  const pluginsMap = {
    common: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: configFiles.tsConfig
        },
        logger: dev
          ? {
              issues: 'silent'
            }
          : void 0
      })
    ],
    dev: [
      new webpack.HotModuleReplacementPlugin({}),
      new HMRServerPlugin({
        debug
      }),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
      })
    ],
    prod: [new ProductionServerPlugin()]
  };

  return {
    mode: dev ? 'development' : 'production',
    cache: true,
    // watch: dev,
    target: 'node',
    context: sourceDir,
    devtool: dev ? 'inline-cheap-source-map' : 'source-map',

    entry: ['./main.ts'],
    output: {
      path: output.absPath,
      filename: 'main.js'
    },
    externals: [
      PnpWebpackExternals({
        workspaceRootDir: workspace.rootDir
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: configFiles.tsConfig
        }) as any
      ]
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true,
                configFile: configFiles.tsConfig,
                experimentalFileCaching: true
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [...pluginsMap.common, ...(dev ? pluginsMap.dev : pluginsMap.prod)],

    stats: 'errors-only',
    optimization: {
      minimize: false,
      nodeEnv: false
    },
    performance: {
      hints: 'error'
    },
    node: {
      __filename: false,
      __dirname: false
    }
  };
}
