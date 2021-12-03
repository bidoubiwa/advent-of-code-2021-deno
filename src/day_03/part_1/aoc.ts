// first parameter: power consumption
// gamma rate, the binary with the most occurence in each collumn
// epsilon rate is the opposite of gamma rate

export function main(input: string): number {
  const sequences = input.split('\n').filter((seq) => seq[0]);

  const init = Array(sequences[0].length).fill([0, 0]);

  const occurences = sequences.reduce(
    (acc: number[][], seq: string) => {
      return acc.map((bins, index) => {
        if (seq[index] === '0') return [bins[0] + 1, bins[1]];
        else return [bins[0], bins[1] + 1];
      });
    },
    init,
  );

  const [gama, epsilon] = occurences.reduce(
    ([gama, epsilon]: string[], [zero, one]: number[]) => {
      if (zero > one) return [gama.concat('0'), epsilon.concat('1')];
      return [gama.concat('1'), epsilon.concat('0')];
    },
    ['', ''],
  );

  console.log({ gama, epsilon });
  return parseInt(gama, 2) * parseInt(epsilon, 2);
}
