import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';

function parseInput(input: string) {
  const heightMap = input.split('\n').map((horizon) =>
    horizon.split('').map((c) => parseInt(c))
  )
    .filter((line) => line.length !== 0);
  return heightMap;
}

function adjecentPoints(x: number, y: number, map: number[][]): number[][] {
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

function exploreBassin(x: number, y: number, map: number[][]): number[] {
  const height = map.length;
  const width = map[0].length;
  const group = [];
  const lowPoints = [];
  const positions = [];
  if (x == 0) group.push(map[y][x + 1]);
  else if (x == width - 1) group.push(map[y][x - 1]);
  else group.push(map[y][x - 1], map[y][x + 1]);

  if (y == 0) group.push(map[y + 1][x]);
  else if (y == height - 1) group.push(map[y - 1][x]);
  else group.push(map[y + -1][x], map[y + 1][x]);

  if (x == 0) positions.push([y, x + 1]);
  else if (x == width - 1) positions.push([y, x - 1]);
  else positions.push([y, x - 1], [y, x + 1]);

  if (y == 0) positions.push([y + 1, x]);
  else if (y == height - 1) positions.push([y - 1, x]);
  else positions.push([y + -1, x], [y + 1, x]);

  if (positions.find(([y1, x1]) => map[y1][x1] < map[y][x]) === undefined) {
    console.log(positions);

    lowPoints.push(map[y][x]);
    return lowPoints;
    // return positions.map([y1, x1] => exploreBassin);
    // exploreBassin(map[y][x]);
  }
  // console.log({
  //   group,
  //   curr: map[y][x],
  //   diff: group.find((pos) => pos < map[y][x]),
  // });
  // console.log(lowPoints);
  return [];
}

function finLowPoints(x: number, y: number, map: number[][]): number[] {
  const height = map.length;
  const width = map[0].length;
  const lowPoints = [];
  const positions: number[][] = adjecentPoints(x, y, map);

  if (positions.find(([y1, x1]) => map[y1][x1] < map[y][x]) === undefined) {
    console.log(positions);

    lowPoints.push(map[y][x]);
    return lowPoints;
    // return positions.map([y1 , x1] => exploreBassin());
    // exploreBassin(map[y][x]);
  }
  // console.log({
  //   group,
  //   curr: map[y][x],
  //   diff: group.find((pos) => pos < map[y][x]),
  // });
  // console.log(lowPoints);
  return [];
}

export function main(input: string) {
  const map = parseInput(input);
  const height = map.length;
  const width = map[0].length;
  const lowPoints: number[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < width; x++) {
      lowPoints.push(...finLowPoints(x, y, map));
    }
  }
  console.log(
    lowPoints.filter((x) => x < 9).reduce((s, p) => s + p + 1, 0),
  );
  const risks = ld.sum(lowPoints) + lowPoints.length;
  console.log(risks);
  return risks;
}

// console.log({
//   group,
//   curr: map[y][x],
//   diff: group.find((pos) => pos < map[y][x]),
// });
