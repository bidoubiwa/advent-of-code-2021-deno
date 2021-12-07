import { arraySum } from '../../../utils/index.ts';

function getMedian(sortCrabs: number[]) {
  const crabsLen = sortCrabs.length;
  if (crabsLen % 2) {
    const median = ((crabsLen / 2.0) + (crabsLen / 2.0 + 1)) / 2.0;
    return median;
  } else {
    const median = sortCrabs.length / 2;
    return median;
  }
}

export function main(input: string): number {
  const crabsPos = input.split(',').map((pos) => parseInt(pos));

  const sortCrabs = crabsPos.sort((a, b) => a - b);

  const median = getMedian(sortCrabs);
  const fuel = sortCrabs.reduce((fuel, crab) => {
    return fuel + Math.abs(crab - sortCrabs[median]);
  }, 0);

  return fuel;
}
