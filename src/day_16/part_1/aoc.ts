import { join, nextBin, windowGen } from '../../../utils/index.ts';

export function parseInput(input: string) {
  return input.split('').filter((x) => x !== '\n');
}

function binToDec(sequence: string[], bitCount: number) {
  const spliced = sequence.splice(0, bitCount);
  return parseInt(spliced.join(''), 2);
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

function resolveOperatorPackages(sequence: string[], version: number): number {
  const lengthResolver = sequence.splice(0, 1)[0];
  // CASE 0
  if (lengthResolver === '0') {
    const subPackLen = binToDec(sequence, 15);
    const operator = sequence.splice(0, subPackLen);
    while (operator.filter((x) => x !== '0').length > 0) {
      version = packageResolver(operator, version);
    }
  } else { // CASE 1
    let packCount = binToDec(sequence, 11);

    while (packCount !== 0) {
      version = packageResolver(sequence, version);
      packCount = packCount -= 1;
    }
  }
  return version;
}

function packageResolver(sequence: string[], version: number): number {
  version += binToDec(sequence, 3);
  const typeId = binToDec(sequence, 3);

  if (typeId == 4) {
    resolveLiteralValue(sequence, version);
  } else {
    return resolveOperatorPackages(sequence, version);
  }

  return version;
}

export function main(input: string): number {
  const hexaSequence = parseInput(input);
  const getNextBin = nextBin(hexaSequence, 1);

  const sequence = join(getNextBin).split('');
  const version = packageResolver(sequence, 0);
  return version;
}
