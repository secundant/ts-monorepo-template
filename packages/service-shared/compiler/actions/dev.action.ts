import { IAction } from '@my-project/service-shared/compiler/actions/IAction';
import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import { Tools } from '@my-project/service-shared/compiler/lib/Tools';
import { WebpackCompiler } from '@my-project/service-shared/compiler/lib/webpack/WebpackCompiler';
import { Logger } from '@my-project/service-shared/compiler/lib/Logger';

export class DevAction implements IAction {
  async handle(options: ICompilerOptions): Promise<void> {
    const debug = false;
    const logger = new Logger({
      debug,
      labels: Logger.makeStaticLabelOption(' nest-builder > dev ')
    });
    const tools = new Tools({
      compiler: options,
      debug
    });
    const compiler = new WebpackCompiler({
      debug
    });

    logger.info(`Starting dev server for "${options.sourceDir}"`);
    await tools.clear();
    logger.debug('Starting webpack');
    compiler.watch(options);
  }
}
