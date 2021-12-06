export function range(start: number, end: number) {
  const list = [];
  const [min, max] = [start, end].sort((a, b) => a - b);

  for (let i = min; i <= max; i++) {
    list.push(i);
  }
  if (start > end) return list.reverse();
  return list;
}

export function rangedArray(range: number): number[] {
  return [...Array(range).keys()];
}
