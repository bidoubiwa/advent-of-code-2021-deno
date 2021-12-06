import { range } from '../../../utils/index.ts';

function createOcean(maxX: number, maxY: number) {
  const ocean = [];
  for (let y = 0; y <= maxY; y++) {
    const row = Array(maxX + 1).fill(0);
    ocean.push(row);
  }
  return ocean;
}

function removeDiagonalDirection(coordinates: number[][][]) {
  return coordinates.filter((vec) => {
    return vec[0][0] === vec[1][0] || vec[0][1] === vec[1][1];
  });
}

function createCoordinates(input: string): number[][][] {
  const coordinates = input.split('\n').map((line) =>
    line
      .split(' -> ')
      .map((coord) =>
        coord
          .split(',')
          .map((number) => parseInt(number))
      )
  );
  coordinates.pop();
  return coordinates;
}

function oceanOuterLimits(coords: number[][][]) {
  let maxX = 0;
  let maxY = 0;

  coords.forEach((coord) =>
    coord.forEach((pos) => {
      if (pos[0] > maxX) maxX = pos[0];
      if (pos[1] > maxY) maxY = pos[1];
    })
  );

  return { maxX, maxY };
}

function markOcean(ocean: number[][], coords: number[][][]) {
  coords.forEach((vec) => {
    if (vec[0][1] === vec[1][1]) {
      range(vec[0][0], vec[1][0]).forEach((point) =>
        ocean[vec[0][1]][point] += 1
      );
    } else if (vec[0][0] === vec[1][0]) {
      range(vec[0][1], vec[1][1]).forEach((point) => {
        ocean[point][vec[0][0]] += 1;
      });
    }
  });
  return ocean;
}

export function main(input: string): number {
  let coordinates = createCoordinates(input);
  coordinates = removeDiagonalDirection(coordinates);

  const { maxX, maxY } = oceanOuterLimits(coordinates);
  const ocean = createOcean(maxX, maxY);
  const ventsMap = markOcean(ocean, coordinates);

  const overlaps = ventsMap.reduce((bigWinds, positions) => {
    return bigWinds + positions.filter((density) => density >= 2).length;
  }, 0);

  return overlaps;
}
