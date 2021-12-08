import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';

function parseInput(input: string) {
  const parsed = input.split('\n').map((line) =>
    line.split(' | ').map((serie) => serie.split(' '))
  );
  parsed.pop();
  return parsed;
}

type InputDigits = string[][];
export function main(input: string): number {
  const inputLines: InputDigits[] = parseInput(input);

  const resolveDigits = inputLines.reduce((validDigits, line) => {
    return validDigits += line[1].filter((digit) =>
      [2, 3, 4, 7].includes(digit.length)
    ).length;
  }, 0);

  return resolveDigits;
}
