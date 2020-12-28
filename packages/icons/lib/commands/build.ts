import { ISourceInfo } from '@app/icons/types';
import * as process from 'process';
import { scanProject } from '@app/icons/lib/scanProject';
import { readSourceFile } from '@app/icons/lib/readSourceFile';
import { writeToFS } from '@app/icons/lib/writeToFS';
import { compileSource } from '@app/icons/lib/compileSource';
import { createIndexFile } from '@app/icons/lib/createIndexFile';
import { destination, project } from '@app/icons/settings.json';
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
