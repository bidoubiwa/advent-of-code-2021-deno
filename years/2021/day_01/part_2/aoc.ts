export function main(input: string) {
  const measure = input.split('\n').map((line) => parseInt(line));

  const depthSums: number[] = [];
  for (let depth = 0; depth < measure.length - 2; depth++) {
    depthSums[depth] = measure[depth] + measure[depth + 1] + measure[depth + 2];
  }

  let tmp = depthSums.splice(0, 1)[0];

  const increases = depthSums.reduce((acc, curr) => {
    if (curr > tmp) acc += 1;
    tmp = curr;
    return acc;
  }, 0);

  return increases;
}
