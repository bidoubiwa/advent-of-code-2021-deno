import {
  copyDay,
  newDayNumber,
  readmeMarkdown,
  writeReadme,
} from './utils/index.ts';

const srcPath = Deno.cwd() + '/src';
let nextDay = newDayNumber(srcPath);
const readme = await readmeMarkdown(nextDay);
writeReadme(readme);
copyDay(nextDay, srcPath);
