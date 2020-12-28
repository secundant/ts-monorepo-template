declare module '@svgr/core' {
  export interface SvgrOptions {
    icon?: boolean;
    memo?: boolean;
    plugins?: unknown[];
    template?: unknown;
    typescript?: boolean;
  }

  export interface SvgrState {
    componentName: string;
  }

  export default function svgr(
    content: string,
    options: SvgrOptions,
    state: SvgrState
  ): Promise<string>;
}
