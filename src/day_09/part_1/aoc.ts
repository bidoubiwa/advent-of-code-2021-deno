function parseInput(input: string) {
  const heightMap = input.split('\n').map((horizon) =>
    horizon.split('').map((c) => parseInt(c))
  )
    .filter((line) => line.length !== 0);
  return heightMap;
}

export function main(input: string) {
  const map = parseInput(input);
  const height = map.length;
  const width = map[0].length;
  const lowPoints = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < width; x++) {
      const group = [];
      if (x == 0) group.push(map[y][x + 1]);
      else if (x == width - 1) group.push(map[y][x - 1]);
      else group.push(map[y][x - 1], map[y][x + 1]);

      if (y == 0) group.push(map[y + 1][x]);
      else if (y == height - 1) group.push(map[y - 1][x]);
      else group.push(map[y + -1][x], map[y + 1][x]);

      if (group.find((pos) => pos < map[y][x]) === undefined) {
        lowPoints.push(map[y][x]);
      } else {
      }
    }
  }
  const risks = lowPoints.filter((x) => x < 9).reduce((s, p) => s + p + 1, 0);
  return risks;
}
