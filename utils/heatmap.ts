import { bgCyan, cyan, red } from 'https://deno.land/x/kleur/colors.ts';

export function showHeatMap(
  map: number[][] | string[][],
  number: number | string,
  y?: number,
  x?: number,
) {
  const displayMap = map.map((x) => Array(x.length).fill(''));

  map.map((val, y1) => {
    val.map((test, x1) => {
      if (map[y1][x1] === number) {
        displayMap[y1][x1] = red(` ${map[y1][x1]}`);
      } else displayMap[y1][x1] = ` ${map[y1][x1]}`;
    });
  });

  if (x !== undefined && y !== undefined) {
    displayMap[y][x] = cyan(` ${map[y][x]}`);
  }

  const a = new TextEncoder().encode('\n');
  Deno.stdout.write(a);
  displayMap.map((y) => {
    y.map((x: string) => {
      const a = new TextEncoder().encode(x);
      Deno.stdout.write(a);
    });
    const a = new TextEncoder().encode('\n');
    Deno.stdout.write(a);
  });
}
