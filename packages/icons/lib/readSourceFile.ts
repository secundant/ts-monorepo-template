import { basename, resolve } from 'path';
import { IProjectOptions, ISourceInfo } from '@app/icons/types';
import { camelCase, upperFirst } from 'lodash';
import { readFile } from 'fs-extra';

export interface IReadFileOptions extends IProjectOptions {
  path: string;
}

export async function readSourceFile({
  path,
  rootDir,
  sourceDir
}: IReadFileOptions): Promise<ISourceInfo> {
  const absPath = resolve(rootDir, sourceDir, path);
  const content = await readFile(absPath, 'utf8');
  const fileName = basename(path);
  const name = upperFirst(camelCase(basename(path, 'svg')));

  return {
    absPath,
    path,
    fileName,
    content,
    name
  };
}
