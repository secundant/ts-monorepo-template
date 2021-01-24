import type { Compilation, Compiler } from 'webpack';
import { Worker } from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/Worker';
import { stringify } from 'querystring';
import { modifyEntries } from '@my-project/service-shared/compiler/lib/webpack/utils/modifyEntries';

export interface HMRServerPluginOptions {
  debug?: boolean;
  enable?: boolean;
}

export class HMRServerPlugin {
  private entrypoint: string;
  private options: Required<HMRServerPluginOptions>;
  private worker: Worker;

  constructor(options: HMRServerPluginOptions) {
    this.options = {
      enable: true,
      debug: false,
      ...options
    };
  }

  apply(compiler: Compiler): void {
    if (!this.options.enable) return;
    (compiler.options.entry as any).main.import = modifyEntries(
      (compiler.options.entry as any).main.import,
      entries => [
        `${require.resolve('./hot-entry/index.ts')}?${stringify({
          debug: this.options.debug
        })}`,
        ...entries
      ]
    );

    compiler.hooks.afterEmit.tapPromise({ name: 'RunScriptPlugin' }, compilation =>
      this.afterEmit(compilation)
    );
    compiler.hooks.watchClose.tap({ name: 'RunScriptPlugin' }, () => this.destroy());
  }

  private async afterEmit(compilation: Compilation): Promise<void> {
    this.init(compilation);
    this.worker.restart();
  }

  private destroy() {
    this.worker.stop();
  }

  private init(compilation: Compilation) {
    if (this.worker) return;
    this.entrypoint = this.getEntrypoint(compilation);
    this.worker = new Worker({
      args: [],
      debug: this.options.debug,
      execArgv: process.execArgv,
      entrypoint: this.entrypoint
    });
  }

  private getEntrypoint({
    assets,
    compiler: {
      options: { output }
    }
  }: Compilation): string {
    const assetsNames = Object.keys(assets);

    if (!output?.path) {
      throw new Error('[RunScriptPlugin] "output.path" should be defined in webpack config');
    }
    return `${output.path}/${assetsNames[0]}`;
  }
}
