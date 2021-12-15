function adjacentPoints(y: number, x: number, map: number[][]): number[][] {
  const height = map.length;
  const width = map[0].length;
  const positions = [];

  // if (x == 0) positions.push([y, x + 1]);
  // else if (x == width - 1) positions.push([y, x - 1]);
  // else positions.push([y, x - 1], [y, x + 1]);

  // if (y == 0) positions.push([y + 1, x]);
  // else if (y == height - 1) positions.push([y - 1, x]);
  // else positions.push([y + -1, x], [y + 1, x]);

  // if (x == 0) positions.push([y, x + 1]);
  if (x !== width - 1) positions.push([y, x + 1]);
  // else positions.push([y, x - 1], [y, x + 1]);

  // if (y == 0) positions.push([y + 1, x]);
  if (y !== height - 1) positions.push([y + 1, x]);
  // else positions.push([y + -1, x], [y + 1, x]);

  return positions;
}

function parseInput(input: string): number[][] {
  const i = input.split('\n').map((line) =>
    line.split('').map((x) => parseInt(x))
  );

  i.pop();
  return i;
}

export function main(input: string): number {
  const cave = parseInput(input);

  const cache: string[] = [`${0},${0}`];
  const adjacents = crawlCave(0, 0, cave, 0, cache);

  console.log(adjacents);
  return 1;
}

let globalRisk = 0;

function crawlCave(
  y: number,
  x: number,
  cave: number[][],
  risk: number,
  cache: string[],
): number {
  // console.log(`--------`);
  // console.log({ curr: `${y},${x}`, risk, cache });
  risk += cave[y][x];
  if (globalRisk !== 0 && risk >= globalRisk) {
    return globalRisk;
  }
  if (x === cave[0].length - 1 && y === cave.length - 1) {
    if (globalRisk === 0) globalRisk = risk;
    else if (globalRisk !== 0 && risk < globalRisk) {
      globalRisk = risk;
    }
    console.log(risk);
    return risk;
  }
  const adjacents = adjacentPoints(y, x, cave).sort(([y1, x1], [y2, x2]) =>
    cave[y1][x1] - cave[y2][x2]
  );

  const risksFilter = adjacents.filter(([y1, x1]) =>
    !cache.includes(`${y1},${x1}`)
  );
  if (risksFilter.length === 0) {
    return 0;
  }
  risksFilter.forEach(([y1, x1]) => cache.push(`${y1},${x1}`));

  const risks = risksFilter.map(([y1, x1]) => {
    const newCache = [...cache];
    return crawlCave(y1, x1, cave, risk, newCache);
  }).filter((risk) => risk !== 0);
  // console.log({ risks });
  // console.log(`--------`);
  if (risks.length === 0) return 0;
  return Math.min(...risks);
}
