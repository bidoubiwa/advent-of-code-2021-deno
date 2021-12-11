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

  return positions.filter((point) =>
    !point.includes(-1) &&
    !point.includes(width) &&
    !point.includes(height)
  );
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

function observePoulpes(map: number[][]) {
  for (let day = 0; true; day++) {
    increaseBlowMeter(map);

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        makeThemBlow(y, x, map);
      }
    }
    let zeros = 0;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 0) zeros += 1;
      }
    }

    if (zeros === (map.length * map[0].length)) {
      return day;
    }
  }
}

export function main(input: string) {
  const map = parseInput(input);
  const blowingDay = observePoulpes(map);
  showHeatMap(map, 0);
  return blowingDay + 1;
}
