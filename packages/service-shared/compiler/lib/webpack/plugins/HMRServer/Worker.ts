import { ChildProcess, fork, Serializable } from 'child_process';
import { Logger } from '@my-project/service-shared/compiler/lib/Logger';
import {
  HMR_SERVER_CONNECTED_MESSAGE,
  HMR_SERVER_DISCONNECTED_MESSAGE,
  HMR_SERVER_UPDATE_MESSAGE
} from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/constants';

export interface WorkerOptions {
  args: any;
  execArgv: any;
  entrypoint: string;
  debug: boolean;
}

export class Worker {
  private logger: Logger;
  private process: ChildProcess | null = null;
  private connected = false;

  constructor(private options: WorkerOptions) {
    this.logger = new Logger({
      debug: this.options.debug,
      labels: Logger.makeStaticLabelOption(' HMRServerPlugin > Worker ')
    });
  }

  restart(): void {
    if (this.process) {
      if (this.connected) {
        this.process.send(HMR_SERVER_UPDATE_MESSAGE);
      } else {
        this.stop();
        this.start();
      }
    } else {
      this.start();
    }
  }

  start(): void {
    const { entrypoint, args, execArgv } = this.options;

    this.process = fork(entrypoint, args, { execArgv });
    this.process.once('exit', (code, signal) => this.handleChildExit(code, signal));
    this.process.once('error', error => this.handleChildError(error));
    this.process.on('message', message => this.handleChildMessage(message));
  }

  stop(signal?: NodeJS.Signals): void {
    if (this.process) {
      this.process.kill(signal);
      this.clear();
    }
  }

  private handleChildExit(code: unknown, signal: unknown) {
    this.logger.info('Server exited');
    if (code) this.logger.error('Exited with code: ' + code);
    if (signal) this.logger.error('Exited after signal: ' + signal);
    if (!this.connected) {
      this.logger.error(`Script did not load or failed HMR, not restarting`);
      this.clear();
      return;
    }
    this.clear();
    this.start();
  }

  private handleChildError(error: Error) {
    this.logger.error(error);
    this.clear();
  }

  private handleChildMessage(message: Serializable) {
    switch (message) {
      case HMR_SERVER_CONNECTED_MESSAGE:
        this.logger.debug('Server connected!');
        this.connected = true;
        break;
      case HMR_SERVER_DISCONNECTED_MESSAGE:
        this.logger.debug('Server disconnected');
        this.connected = false;
        break;
      default:
        break;
    }
  }

  private clear() {
    this.process = null;
    this.connected = false;
  }
}
