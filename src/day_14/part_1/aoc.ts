type PolymersLinks = { [link: string]: string };

function windowGen(sequence: string[]) {
  return () => {
    let currentSequence: string[] = [];
    if (sequence.length === 0) return currentSequence;

    if (sequence.length === 1) currentSequence = [sequence[0]];
    else {
      currentSequence = [sequence[0], sequence[1]];
    }
    sequence.splice(0, 1);
    return currentSequence;
  };
}

function parseInput(input: string) {
  let [polymers, links] = input.split('\n\n');
  const transformations = links.split('\n').map((link) => link.split(' -> '));
  transformations.pop();
  const transforms = transformations.reduce<PolymersLinks>(
    (transformations, link) => {
      transformations[link[0]] = link[1];
      return transformations;
    },
    {},
  );

  return { polymers: polymers.split(''), transforms };
}

export function main(input: string): number {
  const { polymers, transforms } = parseInput(input);

  const windowItter = windowGen(polymers);
  let polymerTuple = windowItter();

  const sequence: string[] = [polymerTuple[0]];
  while (polymerTuple.length > 1) {
    polerize(polymerTuple, transforms, 11, sequence);
    polymerTuple = windowItter();
  }

  const polymerMap = sequence.reduce<Record<string, any>>(
    (occurences, curr) => {
      if (!occurences[curr]) occurences[curr] = 0;
      occurences[curr] += 1;
      return occurences;
    },
    {},
  );

  const sortedPol = Object.keys(polymerMap).map((key) => polymerMap[key]).sort((
    a: number,
    b: number,
  ) => b - a);

  return sortedPol.shift() - sortedPol.pop();
}

function polerize(
  polymerTuple: string[],
  transformations: PolymersLinks,
  depth: number,
  sequence: string[],
) {
  if (depth === 1) {
    sequence.push(polymerTuple[1]);
    return polymerTuple[1];
  }
  const [left, right] = polymerTuple;
  const link = transformations[`${left}${right}`];
  const leftFusion = [left, link];
  const rightFusion = [
    link,
    right,
  ];

  polerize(leftFusion, transformations, depth - 1, sequence);
  polerize(rightFusion, transformations, depth - 1, sequence);
}
