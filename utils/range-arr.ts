export function range(start: number, end: number) {
  const list = [];
  const [min, max] = [start, end].sort();

  for (var i = min; i <= max; i++) {
    list.push(i);
  }
  return list;
}

export function rangedArray(range: number): number[] {
  return [...Array(range).keys()];
}
