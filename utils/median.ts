// stupid median that does not follow the basic formula
// in case of an even size it will just divide by two and in case
// of a comma, it takes the floor not the rounded value.
// stupid. But the right answer anyway for day 10
export function getMedian(crabs: number[]) {
  crabs = crabs.sort((a, b) => a - b);
  const median = Math.floor(crabs.length / 2);
  return crabs[median];
}
