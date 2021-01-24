import { IAction } from '@my-project/service-shared/compiler/actions/IAction';
import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import { Tools } from '@my-project/service-shared/compiler/lib/Tools';
import { WebpackCompiler } from '@my-project/service-shared/compiler/lib/webpack/WebpackCompiler';
import { Logger } from '@my-project/service-shared/compiler/lib/Logger';

export class BuildAction implements IAction {
  async handle(options: ICompilerOptions): Promise<void> {
    const debug = true;
    const logger = new Logger({
      debug,
      labels: Logger.makeStaticLabelOption(' nest-builder > build ')
    });
    const tools = new Tools({
      compiler: options,
      debug
    });
    const compiler = new WebpackCompiler({
      debug
    });

    logger.info(`Building server at "${options.sourceDir}"`);
    await tools.clear();
    logger.debug('Building by webpack');
    try {
      await compiler.build(options);
      logger.info('Done');
    } catch (e) {
      logger.error(e);
    }
  }
}
