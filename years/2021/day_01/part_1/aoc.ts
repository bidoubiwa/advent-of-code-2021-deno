export function main(input: string): number {
  // Int array of all floor depths
  const seaReport = input.split('\n').map((line) => parseInt(line));

  let previousDepth = seaReport.splice(0, 1)[0];

  const increases = seaReport.reduce((increases, curr) => {
    if (curr > previousDepth) increases += 1;
    previousDepth = curr;
    return increases;
  }, 0);

  return increases;
}
