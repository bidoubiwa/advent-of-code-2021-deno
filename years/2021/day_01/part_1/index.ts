type SeaReport = {
  previousDepth: number;
  increases: number;
};

// read file
const text = await Deno.readTextFile("part_1/inputfile");

// Int array of all floor depths
const seaReport = text.split("\n").map((line) => parseInt(line)).reduce<
  SeaReport
>((seaReport, currentDepth) => {
  if (seaReport.previousDepth < currentDepth) {
    seaReport.increases += 1;
  }
  seaReport.previousDepth = currentDepth;
  return seaReport;
}, { increases: 0, previousDepth: Number.POSITIVE_INFINITY });

console.log(seaReport.increases);
