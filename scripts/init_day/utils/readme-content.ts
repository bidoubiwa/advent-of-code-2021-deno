export async function readmeMarkdown(day: number): Promise<Uint8Array> {
  const encoder = new TextEncoder();

  const content = await fetch(
    `https://raw.githubusercontent.com/irevoire/aoc2021/main/day${day}/README.md`,
  ).then((res) => res.text());

  const data = encoder.encode(content);

  return data;
}
