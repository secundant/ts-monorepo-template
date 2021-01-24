/* eslint-disable @typescript-eslint/no-empty-interface */
import { bgBlueBright, bgRgb, bgYellow, yellow, bgRed } from 'chalk';

export interface LoggerOptions {
  debug?: boolean;
  labels?: Partial<LoggerLabels>;
}

export interface WarnLogOptions extends CommonLogOptions {}
export interface InfoLogOptions extends CommonLogOptions {}
export interface DebugLogOptions extends CommonLogOptions {}
export interface ErrorLogOptions extends CommonLogOptions {
  detailed?: boolean;
}

export interface CommonLogOptions {
  label?: string;
}

export interface LoggerLabels {
  Warn: string;
  Info: string;
  Error: string;
  Debug: string;
}

const LabelBox = {
  Success: bgRgb(60, 190, 100).bold.rgb(0, 0, 0),
  Error: bgRed.bold.rgb(0, 0, 0),
  Debug: bgBlueBright.bold.black,
  WarnText: yellow.bold,
  Warn: bgYellow.bold.whiteBright
};

const defaultLabels: LoggerLabels = {
  Debug: ' Debug ',
  Error: ' Error ',
  Info: ' Info ',
  Warn: ' Warn '
};

export class Logger {
  static label(type: keyof typeof LabelBox, message: string): string {
    return LabelBox[type](message);
  }

  static makeStaticLabelOption(value: string) {
    return (Object.keys(defaultLabels) as Array<keyof LoggerLabels>).reduce<Partial<LoggerLabels>>(
      (labels, key) => {
        labels[key] = value;
        return labels;
      },
      {}
    );
  }

  private options: Required<LoggerOptions>;
  private labels: LoggerLabels;

  constructor(options: LoggerOptions = {}) {
    this.options = { debug: !!process.env.DEBUG, labels: {}, ...options };
    this.labels = { ...defaultLabels, ...this.options.labels };
  }

  warn(message: string, { label = this.labels.Warn }: WarnLogOptions = {}): void {
    console.info(`${LabelBox.Success(label)} ${LabelBox.WarnText(message)}`);
  }

  info(message: string, { label = this.labels.Info }: InfoLogOptions = {}): void {
    console.info(`${LabelBox.Success(label)} ${message}`);
  }

  error(
    error: Error | string,
    { label = this.labels.Error, detailed }: ErrorLogOptions = {}
  ): void {
    console.info(`${LabelBox.Error(label)} ${isError(error) ? error.message : error}`);
    if (isError(error) && detailed) {
      console.error(error);
    }
  }

  debug(message: string, { label = this.labels.Debug }: DebugLogOptions = {}): void {
    if (!this.options.debug) return;
    console.info(`${LabelBox.Debug(label)} ${message}`);
  }
}

const isError = (value: unknown): value is Error => value instanceof Error;
