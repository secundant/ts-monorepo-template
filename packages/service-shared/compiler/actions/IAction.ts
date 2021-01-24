import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';

export interface IAction {
  handle(options: ICompilerOptions): Promise<unknown>;
}
