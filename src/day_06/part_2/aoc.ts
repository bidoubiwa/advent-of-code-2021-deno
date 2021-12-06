export function main(input: string): number {
  const fishes = input
    .split(',')
    .map((nbr) => parseInt(nbr))
    .sort((a, b) => a - b);

  const fishPerDay = Array(9).fill(0);

  fishes.reduce((fishes, dueDay) => {
    fishes[dueDay] += 1;
    return fishes;
  }, fishPerDay);

  for (let day = 0; day < 256; day++) {
    const birth = fishPerDay.shift();
    fishPerDay.push(birth);
    fishPerDay[6] += birth;
  }

  const totalfish = fishPerDay.reduce(
    (totalFishes, fishes) => totalFishes + fishes,
    0,
  );

  return totalfish;
}
