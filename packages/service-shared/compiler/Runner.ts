import { BuildAction } from '@my-project/service-shared/compiler/actions/build.action';
import { DevAction } from '@my-project/service-shared/compiler/actions/dev.action';
import { IAction } from '@my-project/service-shared/compiler/actions/IAction';
import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';
import { resolve } from 'path';

export interface RunnerOptions {
  cwd: string;
  commandName: keyof typeof actions;
}

export class Runner {
  private action: IAction;
  private compilerOptions: ICompilerOptions;

  constructor({ commandName, cwd }: RunnerOptions) {
    const ActionClass = actions[commandName];

    if (!ActionClass) {
      throw new Error(`Not found command "${commandName}"`);
    }
    this.action = new ActionClass();
    this.compilerOptions = {
      workspace: {
        rootDir: resolve(cwd, '..', '..')
      },
      sourceDir: cwd,
      configFiles: {
        tsConfig: resolve(cwd, 'tsconfig.json')
      },
      output: {
        path: 'dist',
        absPath: resolve(cwd, 'dist')
      },
      entries: {
        main: {
          fileName: 'main.ts',
          absPath: resolve(cwd, 'main.ts')
        }
      }
    };
  }

  run() {
    return this.action.handle(this.compilerOptions);
  }
}

const actions = {
  build: BuildAction,
  dev: DevAction
};
