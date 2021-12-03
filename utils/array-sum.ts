export function arraySum(array: number[]): number {
  return array.reduce((acc, curr) => acc + curr, 0);
}
