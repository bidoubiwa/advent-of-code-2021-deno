export function main(input: string) {
  const lines = input.split('\n').filter((line) => line !== '');
  console.log({ lines });
  const open = ['(', '[', '{', '<'];
  const close = [')', ']', '}', '>'];
  const scores = [3, 57, 1197, 25137];

  const total = lines.reduce((score, line) => {
    let prev: number[] = [];
    const amount = line.split('').reduce((illegal, curr, index) => {
      if (illegal) return illegal;

      const currIndex = close.indexOf(curr);
      if (
        currIndex !== -1 &&
          prev.length > 0 &&
          currIndex !== prev.pop() || ''
      ) {
        return scores[currIndex];
      }

      if (!close.includes(curr)) {
        prev.push(open.indexOf(curr));
      }
      return 0;
    }, 0);

    return score + amount;
  }, 0);
  return total;
}
