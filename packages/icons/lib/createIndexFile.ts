import { IDestinationOptions, IProjectOptions, ISourceInfo } from '@app/icons/types';
import { dirname, join, resolve } from 'path';
import { writeFile } from 'fs-extra';
import { format, resolveConfig } from 'prettier';

export interface ICreateIndexFileOptions {
  project: IProjectOptions;
  entries: ISourceInfo[];
  destination: IDestinationOptions;
}

export async function createIndexFile({
  destination: { iconsDir, indexDir },
  entries,
  project: { rootDir, importAlias }
}: ICreateIndexFileOptions): Promise<void> {
  const indexFilePath = resolve(rootDir, indexDir, 'index.ts');

  const imports = entries
    .map(
      ({ path, name }) =>
        `import ${name} from "${join(importAlias, iconsDir, dirname(path), name)}";`
    )
    .join('\n');

  const exports = `export {${entries.map(({ name }) => name).join(',\n')}}`;

  const prettierConfig = await resolveConfig(indexFilePath);

  await writeFile(
    indexFilePath,
    await format(
      `${imports}

    ${exports}`,
      {
        ...prettierConfig,
        parser: 'typescript'
      }
    ),
    'utf8'
  );
}
