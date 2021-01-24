import { ICompilerOptions } from '@my-project/service-shared/compiler/lib/CompilerOptions/ICompilerOptions';

export interface ICompiler {
  build(options: ICompilerOptions): Promise<unknown>;
  watch(options: ICompilerOptions): ICompilerWatcher;
}

export interface ICompilerWatcher {
  cancel(): Promise<unknown>;
}
