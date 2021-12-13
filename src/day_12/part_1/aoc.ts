import { isLowerCase } from '../../../utils/index.ts';

type Node = {
  name: string;
  links: Node[];
  small: boolean;
};

type Links = {
  [name: string]: Node;
};

function createNode(name: string) {
  return {
    name,
    links: [],
    small: isLowerCase(name),
  };
}

function parseInput(input: string) {
  const lines = input
    .split('\n').filter((l) => l.length > 1);
  const links: Links = {};

  lines.forEach((line) => {
    const [left, right]: string[] = line.split('-');

    if (!links[left]) links[left] = createNode(left);
    if (!links[right]) links[right] = createNode(right);

    links[left].links.push(links[right]);
    if (left !== 'start') links[right].links.push(links[left]);
  });
  return links;
}

function visitCave(node: Node, path: string): string[] {
  path = path + `,` + node.name;
  let paths: string[] = [];
  if (node.name === 'end') return [path];
  node.links.forEach((childNode) => {
    if (!(childNode.small && path.includes(childNode.name))) {
      paths.push(...visitCave(childNode, path));
    }
  });

  return paths;
}

export function main(input: string): number {
  const labyrinth = parseInput(input);
  const paths: string[] = [];
  for (const node of labyrinth['start'].links) {
    paths.push(...visitCave(node, 'start'));
  }
  const pathsWithSmallCaves = paths.filter((path) =>
    path.replace('start', '').replace('end', '').search(/[a-z]/) !== -1
  );

  return pathsWithSmallCaves.length;
}
