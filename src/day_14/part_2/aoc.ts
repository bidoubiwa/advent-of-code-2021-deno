type PolymersLinks = { [link: string]: string };

type MoleculesCount = {
  [molecule: string]: number;
};

type Cache = {
  [step: number]: {
    [polymerTuple: string]: MoleculesCount;
  };
};

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

function mergeMolecules(
  leftCount: MoleculesCount,
  rightCount: MoleculesCount,
): MoleculesCount {
  const moleculeCount = { ...leftCount, ...rightCount };

  return Object.keys(moleculeCount).reduce<MoleculesCount>(
    (moleculeCount, molecule) => {
      if (leftCount[molecule] && rightCount[molecule]) {
        moleculeCount[molecule] += leftCount[molecule];
      }
      return moleculeCount;
    },
    moleculeCount,
  );
}

export function main(input: string): number {
  const { polymers, transforms } = parseInput(input);
  let polymerCount: MoleculesCount = {};
  const cache = {};

  const windowItter = windowGen(polymers);
  let polymerTuple = windowItter();

  polymerCount[polymerTuple[0]] = 1;

  while (polymerTuple.length > 1) {
    const moleculeCount = polerize(polymerTuple, transforms, 41, cache);
    polymerCount = mergeMolecules(moleculeCount, polymerCount);
    polymerTuple = windowItter();
  }
  const sortedCount = Object.values(polymerCount).sort((
    a: number,
    b: number,
  ) => a - b);

  // @ts-ignore
  return sortedCount.pop() - sortedCount.shift();
}

function polerize(
  polymerTuple: string[],
  transformations: PolymersLinks,
  depth: number,
  cache: Cache,
): MoleculesCount {
  cache[depth] = cache[depth] || {};
  const [left, right] = polymerTuple;
  const polymer = `${left}${right}`;

  if (depth === 1) {
    return { [right]: 1 };
  }

  if (cache[depth][polymer]) {
    return cache[depth][polymer];
  }

  const link = transformations[`${left}${right}`];
  const leftFusion = [left, link];
  const rightFusion = [
    link,
    right,
  ];

  const leftCount = polerize(leftFusion, transformations, depth - 1, cache);
  const rightCount = polerize(rightFusion, transformations, depth - 1, cache);

  cache[depth][polymer] = mergeMolecules(leftCount, rightCount);

  return cache[depth][polymer];
}
