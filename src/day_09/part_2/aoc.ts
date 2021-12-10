import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';
import {
  bgCyan,
  cyan,
  red,
  underline,
} from 'https://deno.land/x/kleur/colors.ts';

function showHeatMap(
  displayMap: string[][],
  bassins: number[][][],
  map: number[][],
) {
  bassins.map(
    (bassin) => {
      bassin.map(([y1, x1]) => {
        if (displayMap[y1]) displayMap[y1][x1] = bgCyan(` ${map[y1][x1]}`);
      });
    },
  );

  const a = new TextEncoder().encode('\n');
  Deno.stdout.write(a);
  displayMap.map((y) => {
    y.map((x) => {
      const a = new TextEncoder().encode(x);
      Deno.stdout.write(a);
    });
    const a = new TextEncoder().encode('\n');
    Deno.stdout.write(a);
  });
}

function parseInput(input: string) {
  const heightMap = input.split('\n').map((horizon) =>
    horizon.split('').map((c) => parseInt(c))
  )
    .filter((line) => line.length !== 0);
  return heightMap;
}

function adjacentPoints(y: number, x: number, map: number[][]): number[][] {
  const height = map.length;
  const width = map[0].length;
  const positions = [];

  if (x == 0) positions.push([y, x + 1]);
  else if (x == width - 1) positions.push([y, x - 1]);
  else positions.push([y, x - 1], [y, x + 1]);

  if (y == 0) positions.push([y + 1, x]);
  else if (y == height - 1) positions.push([y - 1, x]);
  else positions.push([y + -1, x], [y + 1, x]);

  return positions;
}

function lowEntourage(y: number, x: number, map: number[][]): number[][] {
  const positions: number[][] = adjacentPoints(y, x, map);

  if (positions.find(([y1, x1]) => map[y1][x1] < map[y][x]) === undefined) {
    return positions;
  }
  return [];
}

function exploreBassin(y: number, x: number, map: number[][]): number[][] {
  const bassin = [[]];
  const isLow = lowEntourage(y, x, map);
  const cache = [[y, x].join(',')];

  if (isLow.length > 0) {
    return bassinArea(y, x, map, cache).map((digit) =>
      digit.split(',').map((x) => parseInt(x))
    );
  }
  return bassin;
}

function bassinArea(y: number, x: number, map: number[][], cache: string[]) {
  if (map[y][x] === 9) return [];
  if (cache.includes([y, x].join(',')) === undefined) return [];

  adjacentPoints(y, x, map)
    .filter(([y1, x1]) => !cache.includes([y1, x1].join(',')))
    .filter(([y1, x1]) => map[y1][x1] !== 9)
    .map((point) => {
      cache.push(point.join(','));
      return point;
    })
    .map(([y1, x1]) => bassinArea(y1, x1, map, cache));
  return cache;
}

export function main(input: string) {
  const map = parseInput(input);
  const bassins = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const bassin = exploreBassin(y, x, map);
      if (bassin.length) {
        bassins.push(bassin);
      }
    }
  }

  let displayMap = [...map].map((y) => y.map((x) => ' ' + x.toString()));

  bassins.sort((a, b) => b.length - a.length);

  showHeatMap(displayMap, bassins, map);

  return bassins.splice(0, 3).reduce(
    (sizes, bassin) => sizes * bassin.length,
    1,
  );
}
