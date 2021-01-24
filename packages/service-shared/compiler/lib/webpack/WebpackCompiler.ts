import {
  ICompiler,
  ICompilerWatcher
} from '@my-project/service-shared/compiler/lib/Compiler/ICompiler';
import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import webpack from 'webpack';
import { configurationFactory } from '@my-project/service-shared/compiler/lib/webpack/configuration.factory';
import { Logger } from '@my-project/service-shared/compiler/lib/Logger';

export interface WebpackCompilerOptions {
  debug: boolean;
}

export class WebpackCompiler implements ICompiler {
  private logger = new Logger({
    debug: this.options.debug,
    labels: Logger.makeStaticLabelOption(' WebpackCompiler ')
  });

  constructor(private options: WebpackCompilerOptions) {}

  build(options: ICompilerOptions): Promise<unknown> {
    const compiler = webpack(
      configurationFactory(options, {
        debug: this.options.debug,
        dev: false
      })
    );

    return new Promise<unknown>((resolve, reject) => {
      compiler.run((err, stats) => {
        this.handleCompilation(err, stats);
        err ? reject(err) : resolve(stats);
      });
    });
  }

  watch(options: ICompilerOptions): ICompilerWatcher {
    const compiler = webpack(
      configurationFactory(options, {
        debug: this.options.debug,
        dev: true
      })
    );

    compiler.hooks.beforeCompile.tap('Rebuild info', () => {
      this.logger.info('Building application...');
    });

    const watcher = compiler.watch({}, (err, stats) => this.handleCompilation(err, stats));

    return {
      cancel(): Promise<unknown> {
        return new Promise<unknown>(resolve => watcher.close(resolve));
      }
    };
  }

  private handleCompilation(err?: Error, stats?: webpack.Stats) {
    if (err && !stats) {
      this.logger.error('Critical error');
      this.logger.error(err, {
        detailed: true
      });
      process.exit(1);
    }
    if (!stats) return;
    if (this.options.debug) {
      this.logger.debug('Stats:');
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
          modules: false,
          assets: false,
          warningsFilter: /^(?!CriticalDependenciesWarning$)/
        })
      );
    }
  }
}
