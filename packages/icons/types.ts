export interface IProjectOptions {
  rootDir: string;
  // Path related to rootDir
  sourceDir: string;
  importAlias: string;
}

export interface IDestinationOptions {
  iconsDir: string;
  indexDir: string;
}

export interface ISourceInfo {
  name: string;
  path: string;
  absPath: string;
  content: string;
  fileName: string;
}

export interface ICompileInfo {
  typescriptJSX: ICompileFileInfo;
}

export interface ICompileFileInfo {
  content: string;
}
