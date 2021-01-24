export interface ICompilerOptions {
  workspace: {
    rootDir: string;
  };
  output: {
    path: string;
    absPath: string;
  };
  sourceDir: string;
  entries: IEntriesRecord;
  configFiles: {
    tsConfig: string;
  };
}

export interface IEntriesRecord {
  main: IEntryOptions;
}

export interface IEntryOptions {
  fileName: string;
  absPath: string;
}
