type Board = string;
type Boards = Board[];

function rangedArray(range: number): number[] {
  return [...Array(range).keys()];
}

function verification(
  board: string,
  rowLen: number,
  colLen: number,
): Boolean {
  // console.log(board, rowLen, colLen);
  // console.log('---')
  return rangedArray(colLen)
    .findIndex((index) => {
      let winningStreak = new RegExp(
        `((^.{${index}}(x).*)\n?){${colLen}}|((x.|\n){${rowLen}})`,
        'gm',
      );
      return board
        .search(winningStreak) !== -1;
    }) !== -1;
}

function markBoards(boards: Boards, nbr: string) {
  console.log(boards);
  // const regex = new RegExp(`(.*?)(^| )(${nbr})( |\n)(.*)`, 'g');
  // const regex = new RegExp(`([^0-9]*)${nbr})([^0-9]*)`, 'g');
  // return boards
  //   .map((board) => {
  //     console.log('===');
  //     console.log({ nbr, regex });
  //     console.log(board);
  //     const test = board.replace(regex, '$1x');
  //     console.log('---');
  //     console.log(test);
  //     console.log('===');
  //     return test;
  //   });

  const test = boards.map((board) => {
    const a = board
      .split('\n')
      .map((row) => {
        console.log({ row, nbr });
        return row
          .split(' ')
          .map((c) => c === nbr ? 'x' : c)
          .join(' ');
      })
      .join('\n');
    console.log(a);
    return a;
  });
  return test;
}

export function bingoCarac(input: string): {
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
    rowLen: boards[0].split('\n')[0].split(' ').length - 1,
    colLen: boards[0].split('\n').length - 1,
  };
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
      .find((board) => verification(board, rowLen, colLen));
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
  let { boards, rowLen, colLen, bingoNbrs } = bingoCarac(input);
  let freshBoards = [...boards];
  const { bingo, number } = startBingo(bingoNbrs, freshBoards, rowLen, colLen);
  console.log(bingo);
  const total = bingo
    .split(/ |\n/g)
    .filter((c) => !['x', ''].includes(c))
    .map((c) => parseInt(c))
    .reduce((sum, nbr) => sum += nbr, 0);

  return total * number;
}
