type Board = string;
type Boards = Board[];

function rangedArray(range: number): number[] {
  return [...Array(range).keys()];
}

export function bingoInit(input: string): {
  rowLen: number;
  colLen: number;
  bingoNbrs: string[];
  boards: string[];
} {
  const boards = input
    .split(/^\n/gm)
    .map((board) => board.replaceAll('  ', ' '));

  return {
    boards,
    bingoNbrs: boards.splice(0, 1)[0].split(','),
    rowLen: boards[0].split('\n')[0].split(' ').length,
    colLen: boards[0].split('\n').length - 1,
  };
}

function isItBingo(
  board: string,
  rowLen: number,
  colLen: number,
): Boolean {
  return rangedArray(colLen)
    .findIndex((index) => {
      let winningStreak = new RegExp(
        `(^ ?([0-9x]+ ){${index}}(x).*\n?){${colLen}}|((.?x){${rowLen}}\n)`,
        'gm',
      );
      return board.search(winningStreak) !== -1;
    }) !== -1;
}

function replacer(
  whole: string,
  before: string,
  match: string,
) {
  return whole.replace(match, 'x');
}

function markBoards(boards: Boards, nbr: string) {
  const regex = new RegExp(`([^0-9]+|^)(${nbr})([^0-9]+)`, 'g');
  return boards
    .map((board) => board.replace(regex, replacer));
}

function startBingo(
  distribution: string[],
  boards: string[],
  rowLen: number,
  colLen: number,
) {
  for (const number of distribution) {
    boards = markBoards(boards, number);
    const bingo = boards
      .find((board) => isItBingo(board, rowLen, colLen));
    if (bingo) {
      return {
        number: parseInt(number),
        bingo,
      };
    }
  }
  return {
    number: 0,
    bingo: '',
  };
}

export function main(input: string): number {
  let { boards, rowLen, colLen, bingoNbrs } = bingoInit(input);
  let freshBoards = [...boards];

  const { bingo, number } = startBingo(bingoNbrs, freshBoards, rowLen, colLen);

  const total = bingo
    .split(/ |\n/g)
    .filter((c) => !['x', ''].includes(c))
    .map((c) => parseInt(c))
    .reduce((sum, nbr) => sum += nbr, 0);

  return total * number;
}
