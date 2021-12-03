function resolveBin([zeros, ones]: number[], biggest: boolean) {
  if (zeros > ones) return (biggest) ? '0' : '1';
  return (biggest) ? '1' : '0';
}

function occurenceAtPost(sequences: string[], pos: number) {
  return sequences.reduce(([zeros, ones], seq: string) => {
    if (seq[pos] === '0') return [zeros += 1, ones];
    return [zeros, ones += 1];
  }, [0, 0]);
}

function recursiveReduce(
  sequences: string[],
  pos: number,
  biggest: boolean,
): string[] {
  if (sequences.length <= 1) {
    return sequences;
  }
  const occurences = occurenceAtPost(sequences, pos);
  const bin = resolveBin(occurences, biggest);
  const reducedSequences = sequences.filter((seq) => {
    return seq[pos] === bin;
  });

  return recursiveReduce(reducedSequences, pos += 1, biggest);
}

export function main(input: string): number {
  const sequences = input.split('\n').filter((seq) => seq[0]);

  const oxygenRating = recursiveReduce(sequences, 0, true)[0];
  const scrubberRating = recursiveReduce(sequences, 0, false)[0];

  return parseInt(oxygenRating, 2) * parseInt(scrubberRating, 2);
}
