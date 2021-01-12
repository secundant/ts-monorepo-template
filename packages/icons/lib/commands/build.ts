import { ISourceInfo } from '@my-project/icons/types';
import * as process from 'process';
import { scanProject } from '@my-project/icons/lib/scanProject';
import { readSourceFile } from '@my-project/icons/lib/readSourceFile';
import { writeToFS } from '@my-project/icons/lib/writeToFS';
import { compileSource } from '@my-project/icons/lib/compileSource';
import { createIndexFile } from '@my-project/icons/lib/createIndexFile';
import { destination, project } from '@my-project/icons/settings.json';
import { resolve } from 'path';

project.rootDir = resolve(process.cwd(), project.rootDir);

async function main() {
  const { paths } = await scanProject(project);
  const sources: ISourceInfo[] = [];

  console.log(`Compiling ${paths.length} icons...`);
  for (const path of paths) {
    const sourceInfo = await readSourceFile({
      path,
      ...project
    });
    const compileInfo = await compileSource(sourceInfo);

    await writeToFS({
      project,
      source: sourceInfo,
      compiled: compileInfo,
      destination
    });

    sources.push(sourceInfo);
  }

  console.log(`Icons created, creating index file...`);
  await createIndexFile({
    entries: sources,
    project: project,
    destination
  });
  console.log('Done.');
}

main();
