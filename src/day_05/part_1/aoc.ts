import { range } from '../../../utils/index.ts';

function createOcean(maxX: number, maxY: number) {
  const ocean = [];
  for (let y = 0; y <= maxY; y++) {
    const element = [];
    for (let x = 0; x <= maxX; x++) {
      element.push(0);
    }
    ocean.push(element);
  }
  return ocean;
}

function removeDiagonalDirection(coordinates: number[][][]) {
  return coordinates.filter((vec) => {
    // console.log(vec);
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
      if (pos[1] > maxX) maxY = pos[1];
    })
  );

  return { maxX, maxY };
}

function markOcean(ocean: number[][], coords: number[][][]) {
  const marks = [];
  coords.forEach((vec) => {
    console.log(vec);
    console.log(ocean[0]);
    // console.log(JSON.stringify(ocean.map((x) => x.join()), null, 1));
    range(vec[0][0], vec[1][0]).forEach((point) => {
      ocean[vec[0][0]][point] += 1;
      console.log('AFTER', ocean[vec[0][0]][point]);
      console.log(JSON.stringify(ocean));
    });
    range(vec[1][0], vec[1][1]).forEach((point) => {
      // ocean[point][vec[1][0]] += 1;
    });
  });
  return ocean;
}

export function main(input: string): number {
  let coordinates = createCoordinates(input);
  // console.log(JSON.stringify(coordinates, null, 2));

  coordinates = removeDiagonalDirection(coordinates);
  const { maxX, maxY } = oceanOuterLimits(coordinates);
  console.log({ maxX, maxY });
  const ocean = createOcean(maxX, maxY);

  const markOverlaps = markOcean(ocean, coordinates);
  console.log(JSON.stringify(markOverlaps.map((x) => x.join()), null, 1));
  return 1;
}
