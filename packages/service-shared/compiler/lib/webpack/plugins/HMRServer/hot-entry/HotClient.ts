import { Logger } from '@my-project/service-shared/compiler/lib/Logger';
import { HMR_FAILED_MODULE_HOT_STATUSES } from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/constants';

export interface HotClientOptions {
  debug?: boolean;
}

interface UpdateResult {
  outdatedModules: string[];
  updatedModules: string[];
}

declare const module: any;

export class HotClient {
  private logger: Logger;

  constructor(private options: HotClientOptions) {
    this.logger = new Logger({
      debug: this.options.debug,
      labels: {
        Warn: ' HMR ',
        Info: ' HMR ',
        Error: ' HMR ',
        Debug: ' HMR '
      }
    });
  }

  async tryUpdate() {
    const status = module.hot.status();
    const canBeUpdated = status === 'idle';

    if (canBeUpdated) {
      try {
        await this.update();
      } catch (e) {
        this.handleUpdateError(e);
      }
    } else {
      this.logger.debug(`Wrong status "${status}" instead of "idle"`);
    }
  }

  async update(): Promise<void> {
    this.logger.debug('Updating...');
    const outdatedModules = await this.getOutdatedModules();

    if (outdatedModules) {
      await this.applyUpdate(outdatedModules);
    } else {
      this.logger.debug('Not found update');
    }
  }

  async reCheckUpdate(): Promise<void> {
    this.logger.debug('Rechecking HMR state after update...');
    const outdatedModules = await this.getOutdatedModules();

    if (outdatedModules) {
      await this.applyUpdate(outdatedModules);
    } else {
      this.logger.debug('Not found update');
    }
  }

  private async applyUpdate(outdatedModules: string[]) {
    const updatedModules = await this.getUpdatedModules();

    this.handleUpdateSuccess({
      updatedModules,
      outdatedModules
    });
    await this.reCheckUpdate();
  }

  private getOutdatedModules(): Promise<string[]> {
    return module.hot.check();
  }

  private getUpdatedModules(): Promise<string[]> {
    return module.hot.apply({
      ignoreUnaccepted: true,
      onUnaccepted: ({ chain }: any) =>
        this.handleUnaccepted('Unaccepted modules during update', chain)
    });
  }

  private handleUpdateSuccess({ outdatedModules, updatedModules }: UpdateResult) {
    const unacceptedModules = outdatedModules.filter(
      moduleName => !updatedModules.includes(moduleName)
    );

    if (unacceptedModules.length) {
      this.handleUnaccepted(
        "The following modules couldn't be hot updated: (They would need a full reload!)",
        unacceptedModules
      );
    }
    if (!updatedModules.length) {
      this.logger.debug('No updated modules');
    } else {
      this.logger.info(
        `Hot update result:\n${this.createModulesListMessage(
          updatedModules,
          `${Logger.label('Success', ' Updated ')} - `
        )}`
      );
    }
  }

  private handleUnaccepted(message: string, modules: string[]) {
    this.logger.warn(`${message}:`);
    console.log(this.createModulesListMessage(modules, `${Logger.label('Error', ' Ignored ')} - `));
  }

  private handleUpdateError(error: Error) {
    this.logger.error(error, {
      detailed: true
    });

    if (HMR_FAILED_MODULE_HOT_STATUSES.includes(module.hot.status())) {
      this.logger.error('HMR was broken, you need to restart application!');
    }
  }

  private createModulesListMessage(modules: string[], linePrefix = ' - ') {
    return modules.map(moduleName => `      ${linePrefix}${moduleName}`).join('\n');
  }
}
