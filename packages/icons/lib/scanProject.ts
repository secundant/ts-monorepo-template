import { IProjectOptions } from '@my-project/icons/types';
import { resolve } from 'path';
import { sync } from 'glob';

export interface IScanProjectResult {
  paths: string[];
}

export async function scanProject({
  sourceDir,
  rootDir
}: IProjectOptions): Promise<IScanProjectResult> {
  const cwd = resolve(rootDir, sourceDir);

  console.log(`Scanning "${cwd}"`);
  const paths = await sync('**/*.svg', {
    cwd
  });

  return {
    paths
  };
}
