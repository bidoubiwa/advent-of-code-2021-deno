import { rangedArray, showHeatMap } from '../../../utils/index.ts';

function parseInput(input: string) {
  const lines = input.split('\n');

  return lines.reduce<{ dots: number[][]; folds: string[] }>(
    ({ dots, folds }, curr) => {
      if (curr.includes(',')) {
        dots.push(curr.split(',').map((x) => parseInt(x)));
      } else if (curr.startsWith('fold')) folds.push(curr.split(' ')[2]);
      return { dots, folds };
    },
    { dots: [], folds: [] },
  );
}

function gridDimensions(dots: number[][]) {
  const { width, height } = dots.reduce<{ width: number; height: number }>(
    ({ width, height }, curr) => {
      if (curr[0] > width) width = curr[0];
      if (curr[1] > height) height = curr[1];
      return { width, height };
    },
    { width: 0, height: 0 },
  );
  return { width: width + 1, height: height + 1 };
}

type Map = string[][];
function createMap(
  height: number,
  width: number,
  dots: number[][],
): Map {
  const map = rangedArray(height).map((x) => Array(width).fill('.'));

  dots.forEach(([x, y]) => {
    map[y][x] = '#';
  });
  return map;
}

function foldMap(
  height: number,
  width: number,
  map: Map,
  foldAxe: string,
  foldIndex: number,
) {
  if (foldAxe === 'y') {
    const upper = map.splice(0, foldIndex);
    map.shift();
    map.reverse();

    return upper.map((line, y) => {
      return line.map((dot, x) => {
        if (y >= map.length) return dot;
        return [dot, map[y][x]].includes('#') ? '#' : '.';
      });
    });
  }

  if (foldAxe === 'x') {
    const left = createMap(height, width, []);
    const right = createMap(height, map[0].length - foldIndex - 1, []);

    map.reduce<{ left: Map; right: Map }>(
      ({ left, right }, line, y) => {
        line.forEach((dot, x) => {
          if (x < foldIndex) left[y][x] = dot;
          if (x > foldIndex) right[y][x - foldIndex - 1] = dot;
        });
        right[y].reverse();
        return { left, right };
      },
      { left, right },
    );
    return left.map((line, y) => {
      return line.map((dot, x) => {
        return [dot, right[y][x]].includes('#') ? '#' : '.';
      });
    });
  }

  return [];
}

export function main(input: string): number {
  const { dots, folds } = parseInput(input);

  const grid = gridDimensions(dots);
  let height = (grid.height % 2 == 0) ? grid.height + 1 : grid.height;
  let width = grid.width;
  let map = createMap(height, width, dots);

  for (const fold of folds) {
    const [axe, folder] = fold.split('=');
    const foldIndex = parseInt(folder);

    if (axe === 'x') width = foldIndex;
    else height = foldIndex;

    map = foldMap(height, width, map, axe, foldIndex);
  }

  const hashtags = map.reduce((totalDot, line) => {
    line.forEach((dot) => {
      if (dot === '#') totalDot += 1;
    });
    return totalDot;
  }, 0);

  showHeatMap(map, '#');
  return hashtags;
}
