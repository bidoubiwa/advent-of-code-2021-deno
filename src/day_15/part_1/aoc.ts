function parseInput(input: string): number[][] {
  const i = input.split('\n').map((line) =>
    line.split('').map((x) => parseInt(x))
  );
  i.pop();
  return i;
}

function adjacentInf(y: number, x: number, map: number[][]): number[][] {
  const height = map.length;
  const width = map[0].length;
  const positions = [];

  if (x !== 0 && x !== width - 1) {
    if (map[y][x - 1] === Infinity) positions.push([y, x - 1]);
    if (map[y][x + 1] === Infinity) positions.push([y, x + 1]);
  } else if (x === 0 && map[y][x + 1] === Infinity) positions.push([y, x + 1]);
  else if (x === width - 1 && map[y][x + -1] === Infinity) {
    positions.push([y, x - 1]);
  }

  if (y !== 0 && y !== height - 1) {
    if (map[y - 1][x] === Infinity) positions.push([y - 1, x]);
    if (map[y + 1][x] === Infinity) positions.push([y + 1, x]);
  } else if (y === 0 && map[y + 1][x] === Infinity) positions.push([y + 1, x]);
  else if (y === height - 1 && map[y - 1][x] === Infinity) {
    positions.push([y - 1, x]);
  }
  return positions;
}

export function main(input: string): number {
  const cave = parseInput(input);
  const fog = [...cave].map((line) => line.map((x) => Infinity));
  const stack: number[][] = [[0, 0]];

  fog[0][0] = cave[0][0];
  const value = crawlCave(cave, fog, stack);
  return value - cave[0][0];
}

function crawlCave(
  cave: number[][],
  fog: number[][],
  stack: number[][],
): number {
  while (true) {
    const [y, x] = stack.shift() || [0, 0];
    const curr = fog[y][x];
    if (y === cave.length - 1 && x === cave[0].length - 1) {
      return curr;
    }
    const infinites = adjacentInf(y, x, fog);
    infinites.forEach(([y1, x1]) => {
      fog[y1][x1] = cave[y1][x1] + curr;
    });
    stack.push(...infinites);
    stack.sort(([y1, x1], [y2, x2]) => fog[y1][x1] - fog[y2][x2]);
  }
}
