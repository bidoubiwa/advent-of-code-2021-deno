export function main(input: string): number {
  const fishes = input
    .split(',')
    .map((nbr) => parseInt(nbr))
    .sort((a, b) => a - b);

  const fishPerDay = Array(10).fill(0);

  fishes.reduce((fishes, dueDay) => {
    fishes[dueDay] += 1;
    return fishes;
  }, fishPerDay);

  for (let day = 0; day < 256; day++) {
    fishPerDay[9] += fishPerDay[0];
    fishPerDay[7] += fishPerDay[0];
    for (let dueDay = 0; dueDay < 9; dueDay++) {
      fishPerDay[dueDay] = fishPerDay[dueDay + 1];
    }
    fishPerDay[9] = 0;
  }

  const totalfish = fishPerDay.reduce(
    (totalFishes, fishes) => totalFishes + fishes,
    0,
  );

  return totalfish;
}
