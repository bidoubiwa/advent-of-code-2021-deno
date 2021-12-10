import { rangedArray } from '../../../utils/index.ts';

type Cache = {
  [nbr: string]: number;
};

function fuelCalculator(steps: number) {
  return (steps * (steps + 1)) / 2;
}

export function main(input: string): number {
  const crabsPos = input.split(',').map((pos) => parseInt(pos));

  let sortCrabs = crabsPos.sort((a, b) => a - b);
  const max = sortCrabs[sortCrabs.length - 1];

  const minFuel = rangedArray(max).reduce<number | undefined>(
    (minFuel, horizonPos) => {
      const fuel = sortCrabs
        .reduce(
          (fuel, crab) => fuel + fuelCalculator(Math.abs(crab - horizonPos)),
          0,
        );
      if (minFuel === undefined || fuel < minFuel) return fuel;
      return minFuel;
    },
    undefined,
  );
  return minFuel || 0;
}
