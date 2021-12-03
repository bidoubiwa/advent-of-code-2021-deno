import * as path from 'https://deno.land/std@0.102.0/path/mod.ts';

export function inputFileResolver(file: string): string {
  const workDir = Deno.cwd();
  const pathToFile = path.dirname(path.fromFileUrl(Deno.mainModule));

  const inputFilePath = pathToFile.replace(`${workDir}/`, '');

  return inputFilePath + '/' + file;
}
