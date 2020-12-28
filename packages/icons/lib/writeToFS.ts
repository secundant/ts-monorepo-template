import {
  ICompileFileInfo,
  ICompileInfo,
  IDestinationOptions,
  IProjectOptions,
  ISourceInfo
} from '@app/icons/types';
import { dirname, resolve } from 'path';
import { ensureDir, writeFile } from 'fs-extra';

export interface WriteToFSOptions {
  source: ISourceInfo;
  project: IProjectOptions;
  compiled: ICompileInfo;
  destination: IDestinationOptions;
}

export async function writeToFS({
  destination: { iconsDir },
  compiled: { javascript, typescript, javascriptJSX, typescriptJSX },
  source,
  project
}: WriteToFSOptions): Promise<void> {
  const dirPath = resolve(project.rootDir, iconsDir, dirname(source.path));

  await Promise.all([
    javascript && writeCompileInfoToFs(resolve(dirPath, `${source.name}.js`), javascript),
    typescript && writeCompileInfoToFs(resolve(dirPath, `${source.name}.ts`), typescript),
    javascriptJSX && writeCompileInfoToFs(resolve(dirPath, `${source.name}.jsx`), javascriptJSX),
    typescriptJSX && writeCompileInfoToFs(resolve(dirPath, `${source.name}.tsx`), typescriptJSX)
  ]);
}

export async function writeCompileInfoToFs(
  absFilePath: string,
  { content }: ICompileFileInfo
): Promise<void> {
  await ensureDir(dirname(absFilePath));
  await writeFile(absFilePath, content, 'utf8');
}
