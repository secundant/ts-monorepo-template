import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import rimraf from 'rimraf';
import { Logger } from '@my-project/service-shared/compiler/lib/Logger';

export interface IToolsOptions {
  compiler: ICompilerOptions;
  debug: boolean;
}

export class Tools {
  private logger = new Logger({
    debug: this.options.debug
  });

  constructor(private options: IToolsOptions) {}

  clear(): Promise<void> {
    this.logger.debug(`Clearing application dist dir "${this.options.compiler.output.absPath}"`, {
      label: ' tools > clear '
    });
    return new Promise((resolve, reject) => {
      rimraf(this.options.compiler.output.absPath, (error?: Error) =>
        error ? reject(error) : resolve()
      );
    });
  }
}
