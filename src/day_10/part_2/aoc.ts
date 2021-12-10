import { getMedian } from '../../../utils/index.ts';

export function main(input: string) {
  const lines = input.split('\n').filter((line) => line !== '');
  const open = ['(', '[', '{', '<'];
  const close = [')', ']', '}', '>'];

  const total = lines.reduce<number[]>((score, line) => {
    let prev: number[] = [];
    const illegal = line.split('').find((curr, index) => {
      const currIndex = close.indexOf(curr);
      if (
        currIndex !== -1 &&
          prev.length > 0 &&
          currIndex !== prev.pop() || ''
      ) {
        return true;
      }

      if (!close.includes(curr)) {
        prev.push(open.indexOf(curr));
      }
      return false;
    }, 0);
    if (illegal) {
      return score;
    }
    score.push(
      prev.reverse().reduce((total, index) => {
        return total * 5 + index + 1;
      }, 0),
    );
    return score;
  }, []);

  return getMedian(total);
}
