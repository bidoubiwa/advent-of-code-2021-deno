import { rangedArray } from '../../../utils/index.ts';
import {
  bgCyan,
  cyan,
  red,
  underline,
} from 'https://deno.land/x/kleur/colors.ts';

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

function showHeatMap(
  height: number,
  width: number,
  dots: Set<string>,
) {
  const newLine = new TextEncoder().encode('\n');
  Deno.stdout.write(newLine);
  rangedArray(height).map((line, y) => {
    rangedArray(width).map((dot, x) => {
      if (dots.has(`${x},${y}`)) {
        const a = new TextEncoder().encode(red('#'));
        Deno.stdout.write(a);
      } else {
        const a = new TextEncoder().encode('.');
        Deno.stdout.write(a);
      }
    });
    const a = new TextEncoder().encode('\n');
    Deno.stdout.write(a);
  });
  const nl = new TextEncoder().encode('\n');
  Deno.stdout.write(nl);
}

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

function foldMap(foldAxe: string, foldIndex: number, dots: number[][]) {
  if (foldAxe === 'y') {
    return dots.map(([x1, y1]) => {
      if (y1 > foldIndex) return [x1, foldIndex - (y1 - foldIndex)];
      return [x1, y1];
    });
  } else {
    return dots.map(([x1, y1]) => {
      if (x1 > foldIndex) return [foldIndex - (x1 - foldIndex), y1];
      return [x1, y1];
    });
  }
}

export function main(input: string): number {
  let { dots, folds } = parseInput(input);

  for (const fold of folds) {
    const [axe, folder] = fold.split('=');
    const foldIndex = parseInt(folder);
    dots = foldMap(axe, foldIndex, dots);
  }
  const dotSet = new Set(dots.map((dot) => dot.join(',')));
  const { width, height } = gridDimensions(dots);

  showHeatMap(height, width, dotSet);
  return dots.length;
}
