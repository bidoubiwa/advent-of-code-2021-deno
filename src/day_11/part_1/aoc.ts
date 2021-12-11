import { showHeatMap } from '../../../utils/index.ts';

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
  const positions = [
    [y, x],
    [y, x - 1],
    [y, x + 1],
    [y - 1, x],
    [y + 1, x],
    [y + 1, x + 1],
    [y + 1, x - 1],
    [y - 1, x + 1],
    [y - 1, x - 1],
  ];

  const pos = positions.filter((point) =>
    !point.includes(-1) &&
    !point.includes(width) &&
    !point.includes(height)
  );
  // console.log({ pos });
  return pos;
}

function increaseBlowMeter(map: number[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      map[y][x] += 1;
    }
  }
}

function makeThemBlow(y: number, x: number, map: number[][]) {
  if (map[y][x] === 10) {
    map[y][x] = 0;
    adjacentPoints(y, x, map)
      .filter(([y1, x1]) => map[y1][x1] !== 10)
      .filter(([y1, x1]) => map[y1][x1] !== 0)
      .map(([y1, x1]) => {
        map[y1][x1] += 1;
        return [y1, x1];
      }).map(([y1, x1]) => makeThemBlow(y1, x1, map));
  }
}

export function main(input: string) {
  const map = parseInput(input);
  let flashes = 0;

  for (let i = 0; i < 100; i++) {
    increaseBlowMeter(map);

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        makeThemBlow(y, x, map);
      }
    }

    map.map((line) =>
      line.map((x) => {
        if (x === 0) flashes++;
      })
    );
  }

  showHeatMap(map, 0);
  return flashes;
}
