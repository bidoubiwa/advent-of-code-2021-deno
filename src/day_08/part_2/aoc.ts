import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts';

function parseInput(input: string) {
  const lines = input.split('\n').map((line) =>
    line.split(' | ').map((serie) => serie.split('')).map(
      (arraySerie) => {
        const serie = arraySerie.join('').split(' ').map((digit) =>
          digit.split('').filter((digit) => digit !== '\n')
        );
        return serie;
      },
    )
  );
  lines.pop();
  return lines;
}

export function main(input: string) {
  const lines = parseInput(input);
  const sequences = [];

  for (const line of lines) {
    const [signalPatterns, encodedDigits] = line;

    const sortedPatterns = signalPatterns.sort((a, b) => a.length - b.length);

    const one = sortedPatterns.find((digit) => digit.length === 2) ||
      [];
    const seven = sortedPatterns.find((digit) => digit.length === 3) || [];
    const four = sortedPatterns.find((digit) => digit.length === 4) || [];
    const eight = sortedPatterns.find((digit) => digit.length === 7) || [];

    const top = ld.difference(seven, one)[0];

    const bottomLeft = sortedPatterns.reduce((mid, digit) => {
      const diff = ld.difference(eight, digit);
      const contained = ld.difference(four, digit);
      if (diff.length === 1 && contained.length === 0) mid = diff[0];
      return mid;
    }, '');

    const middle = sortedPatterns.reduce((mid, digit) => {
      const diff = ld.difference(eight, digit);
      const contained = ld.difference(seven, digit);
      const inc = digit.includes(bottomLeft);
      if (diff.length === 1 && contained.length === 0 && inc) mid = diff[0];
      return mid;
    }, '');

    const bottom: '' = sortedPatterns.reduce((bottom, digit) => {
      const sevenFour = Array.from(new Set([...seven, ...four]));
      const diff = ld.difference(digit, sevenFour);
      if (diff.length === 1) bottom = diff[0];
      return bottom;
    }, '');

    const topRight = sortedPatterns.reduce((topR, digit) => {
      const diff = ld.difference(digit, [top, bottomLeft, bottom, middle]);
      if (diff.length === 1) topR = diff[0];
      return topR;
    }, '');

    const bottomRight = one.find((segment) => segment !== topRight);
    const topLeft = ld.difference(eight, [
      top,
      topRight,
      middle,
      bottomLeft,
      bottomRight,
      bottom,
    ])[0];

    const digitFormat = [
      [top, topLeft, topRight, bottomLeft, bottomRight, bottom],
      [topRight, bottomRight],
      [top, topRight, middle, bottomLeft, bottom],
      [top, topRight, middle, bottomRight, bottom],
      [topLeft, topRight, middle, bottomRight],
      [top, topLeft, middle, bottomRight, bottom],
      [top, topLeft, middle, bottomLeft, bottomRight, bottom],
      [topRight, bottomRight, top],
      [
        top,
        topLeft,
        topRight,
        middle,
        bottomLeft,
        bottomRight,
        bottom,
      ],
      [top, topLeft, topRight, middle, bottomRight, bottom],
    ];

    const sequence = encodedDigits.reduce((seq, encodedDigit) => {
      const index = digitFormat.findIndex((digit) =>
        !ld.difference(digit, encodedDigit).length &&
        !ld.difference(encodedDigit, digit).length
      );
      if (index > -1) seq = seq + index.toString();
      return seq;
    }, '');

    sequences.push(parseInt(sequence));
  }
  return ld.sum(sequences);
}
