import { RangeIter } from '../../../utils/index.ts';

function parseInput(input: string): number[][] {
  input = input.replace('target area: ', '');
  let [x, y] = input.split(', ');
  const [x0, x1] = x.replace('x=', '').split('..').map((x) => parseInt(x));
  const [y0, y1] = y.replace('y=', '').split('..').map((y) => parseInt(y));
  return [
    [x0, x1].sort((a: number, b: number) => b - a),
    [y0, y1].sort((a: number, b: number) => b - a),
  ];
}

function inTrench(
  xPos: number,
  yPos: number,
  [lowX, highX]: number[],
  [lowY, highY]: number[],
): boolean {
  return xPos >= lowX && xPos <= highX && yPos >= lowY && yPos <= highY;
}

function tryVelocity(
  xVel: number,
  yVel: number,
  xTarget: number[],
  yTarget: number[],
) {
  let xPos = 0;
  let yPos = 0;
  let maxHeight = 0;

  while (yPos >= yTarget[0]) {
    if (inTrench(xPos, yPos, xTarget, yTarget)) {
      return true;
    }
    xPos = xPos + xVel;
    yPos = yPos + yVel;
    xVel = (xVel === 0) ? 0 : xVel - 1;
    yVel = yVel - 1;
    if (yPos > maxHeight) maxHeight = yPos;
  }
  return false;
}

function findValidVelocity(xTarget: number[], yTarget: number[]): number {
  let velocityHits = 0;
  for (let velY = yTarget[0]; velY < 500; velY++) {
    for (let velX = 0; velX < 500; velX++) {
      const hit = tryVelocity(velX, velY, xTarget, yTarget);
      if (hit) {
        velocityHits += 1;
      }
    }
  }
  return velocityHits;
}

export function main(input: string): number {
  const [xTarget, yTarget] = parseInput(input);

  const target = findValidVelocity(
    xTarget.sort((a, b) => a - b),
    yTarget.sort((a, b) => a - b),
  );

  return target;
}
