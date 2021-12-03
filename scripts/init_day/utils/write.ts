import { copySync } from 'https://deno.land/std@0.117.0/fs/copy.ts';

import { fileResolver } from '../../../utils/index.ts';
import { paddedDay } from './days.ts';

export function writeReadme(data: Uint8Array) {
  const dummyPath = fileResolver('dummy');
  const readmePath = dummyPath + '/README.md';
  Deno.writeFileSync(readmePath, data);
}

export function copyDay(day: number, srcPath: string) {
  let paddedNextDay = paddedDay(day);
  copySync(fileResolver('dummy'), `${srcPath}/day_${paddedNextDay}`); // returns a promise
}
