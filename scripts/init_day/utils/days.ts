import { fileResolver } from '../../../utils/index.ts';

export function newDayNumber(srcPath: string) {
  const directories = Array.from(Deno.readDirSync(srcPath));
  const dirNames = directories.map((dir) =>
    parseInt(dir.name.replace('day_', ''))
  );
  let nextDay = Math.max(...dirNames) + 1;
  return nextDay;
}

export function paddedDay(day: number): string {
  return day.toString().padStart(2, '0');
}
