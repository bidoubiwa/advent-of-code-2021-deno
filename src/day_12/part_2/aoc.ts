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

    if (left !== 'start') links[right].links.push(links[left]);
    if (right !== 'start') links[left].links.push(links[right]);
  });
  return links;
}

function visitCave(node: Node, path: string, twice: boolean): string[] {
  path = path + `,` + node.name;
  let paths: string[] = [];
  if (node.name === 'end') return [path];
  node.links.forEach((childNode) => {
    if (childNode.name === 'start') console.log(node);
    if (!(childNode.small && path.includes(childNode.name))) {
      paths.push(...visitCave(childNode, path, twice));
    } else if (!twice) {
      paths.push(...visitCave(childNode, path, true));
    }
  });

  return paths;
}

export function main(input: string): number {
  const labyrinth = parseInput(input);
  const paths: string[] = [];
  for (const node of labyrinth['start'].links) {
    paths.push(...visitCave(node, 'start', false));
  }
  return paths.length;
}
