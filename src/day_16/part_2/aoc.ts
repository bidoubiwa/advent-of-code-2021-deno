import {
  IterType,
  join,
  LiterValues,
  nextBin,
  windowGen,
} from '../../../utils/index.ts';

export function parseInput(input: string) {
  return input.split('').filter((x) => x !== '\n');
}

function binToDec(sequence: string[], bitCount: number) {
  return parseInt(sequence.splice(0, bitCount).join(''), 2);
}

function resolveLiteralValue(sequence: string[], version: number) {
  const nextFiveBits = windowGen(sequence, 5);
  let fiveBits = [];
  let lastPart = false;
  const data = [];
  while (!lastPart || fiveBits.length > 0) {
    let fiveBits = nextFiveBits();
    const prefix = fiveBits.splice(0, 1)[0];
    data.push(...fiveBits.splice(0, 4));
    lastPart = prefix === '0';
  }
  const total = parseInt(data.join(''), 2);
  return total;
}

function packagesInLength(
  sequence: string[],
  version: number,
): IterType {
  const values = [];
  const subPackLen = binToDec(sequence, 15);
  const operator = sequence.splice(0, subPackLen);
  while (operator.filter((x) => x !== '0').length > 0) {
    values.push(packageResolver(operator, version));
  }
  return LiterValues(values);
}

function packagesInNbr(sequence: string[], version: number): IterType {
  let packCount = binToDec(sequence, 11);
  const values = [];
  while (packCount !== 0) {
    values.push(packageResolver(sequence, version));
    packCount = packCount -= 1;
  }
  return LiterValues(values);
}

function resolveOperatorPackages(
  sequence: string[],
  version: number,
): IterType {
  const subPckResolver = sequence.splice(0, 1)[0];
  if (subPckResolver === '0') return packagesInLength(sequence, version);
  else if (subPckResolver === '1') return packagesInNbr(sequence, version);
  return LiterValues([]);
}

function packageResolver(sequence: string[], version: number): number {
  version += binToDec(sequence, 3);
  const typeId = binToDec(sequence, 3);
  if (typeId == 0) {
    return resolveOperatorPackages(sequence, version).sum() || 0;
  } else if (typeId == 1) {
    return resolveOperatorPackages(sequence, version).product() || 0;
  } else if (typeId == 2) {
    return resolveOperatorPackages(sequence, version).min() || 0;
  } else if (typeId == 3) {
    return resolveOperatorPackages(sequence, version).max() || 0;
  } else if (typeId == 4) {
    return resolveLiteralValue(sequence, version);
  } else if (typeId == 5) {
    const [a, b] = resolveOperatorPackages(sequence, version).collect();
    return (a > b) ? 1 : 0;
  } else if (typeId == 6) {
    const [a, b] = resolveOperatorPackages(sequence, version).collect();
    return (a < b) ? 1 : 0;
  } else if (typeId == 7) {
    const [a, b] = resolveOperatorPackages(sequence, version).collect();
    return (a === b) ? 1 : 0;
  }
  return 0;
}

export function main(input: string): number {
  const hexaSequence = parseInput(input);
  const getNextBin = nextBin(hexaSequence, 1);
  const sequence = join(getNextBin).split('');

  const version = packageResolver(sequence, 0);
  return version;
}
