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

  // console.log({ polymers, transforms });
  const windowItter = windowGen(polymers);
  let polymerTuple = windowItter();

  const sequence: string[] = [polymerTuple[0]];
  const cache = {};
  while (polymerTuple.length > 1) {
    polerize(polymerTuple, transforms, 11, cache);
    polymerTuple = windowItter();
  }

  // const sortedPol = Object.keys(polymerMap).map((key) => polymerMap[key]).sort((
  //   a: number,
  //   b: number,
  // ) => b - a);

  // return sortedPol.shift() - sortedPol.pop();
  return 1;
}

type Cache = {
  [step: number]: {
    [polymerTuple: string]: {
      [polymer: string]: number;
    };
  };
};

function polerize(
  polymerTuple: string[],
  transformations: PolymersLinks,
  depth: number,
  cache: Cache,
) {
  if (depth === 1) {
    return polymerTuple[1];
  }

  // ["N", "N"]
  const [left, right] = polymerTuple;

  // C
  const link = transformations[`${left}${right}`];

  // ["N", "C"]
  const fusion = [left, link];

  polerize(fusion, transformations, depth - 1, cache);

  // C, N
  const secondFusion = [
    link,
    right,
  ];

  polerize(secondFusion, transformations, depth - 1, cache);

  // return link;
}
