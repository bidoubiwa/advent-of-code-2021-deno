function showMap(map: number[][]) {
  console.log(
    map.map((line) => line.map((x) => x.toString().padEnd(4)).join('')),
  );
}
function parseInput(input: string): number[][] {
  const i = input.split('\n').map((line) =>
    line.split('').map((x) => parseInt(x))
  );
  i.pop();
  return i;
}

function rangeGen(start: number, stop: number) {
  start = start - 1;
  return () => {
    start = start + 1;
    if (start === stop) return null;
    return start;
  };
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

function expandCave(cave: number[][]): number[][] {
  const width = cave[0].length;
  const height = cave.length;

  const heightRange = rangeGen(0, height * 5);
  let y = heightRange();

  const bigCave = [];
  while (y !== null) {
    const line = [];
    const widthRange = rangeGen(0, width * 5);
    let x = widthRange();
    while (x !== null) {
      let risk = cave[y % (height)][x % (width)] +
        Math.floor(x / (width)) +
        Math.floor(y / (height));
      if (risk > 9) {
        risk = risk % 10 + 1;
      }

      line.push(risk);
      x = widthRange();
    }
    bigCave.push(line);
    y = heightRange();
  }
  return bigCave;
}

export function main(input: string): number {
  const cave = parseInput(input);
  const stack: number[][] = [[0, 0]];

  const bigCave = expandCave(cave);
  const fog = [...bigCave].map((line) => line.map((x) => Infinity));

  fog[0][0] = cave[0][0];
  const value = crawlCave(bigCave, fog, stack);
  showMap(fog);

  return value - cave[0][0];
}

// Driskja something something
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
