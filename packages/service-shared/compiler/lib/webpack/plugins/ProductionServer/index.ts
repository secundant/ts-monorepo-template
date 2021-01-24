import { modifyEntries } from '@my-project/service-shared/compiler/lib/webpack/utils/modifyEntries';
import type { Compiler } from 'webpack';

export class ProductionServerPlugin {
  apply(compiler: Compiler): void {
    (compiler.options.entry as any).main.import = modifyEntries(
      (compiler.options.entry as any).main.import,
      entries => [/*require.resolve('source-map-support'), */ ...entries]
    );
  }
}
