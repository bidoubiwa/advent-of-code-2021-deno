type instruction = [string, number]
type instructions = instruction[]
type positions = [number, number, number]

function parseInput(input: string): instructions {
  return input.split("\n").filter(str => str.length > 0).map(raw => {
    let [dir, dis] = raw.split(" ")
    return [dir[0], parseInt(dis)]
  })
}

export function main(input: string): number {
  const instructions = parseInput(input)
  
  const [ hor, depths, aim ]: positions= instructions.reduce(([hor, depths, aim], [instruction, steps]) => {
    if (instruction === 'f') return [ hor += steps, depths += aim * steps, aim ]
    else if (instruction === 'u') return [ hor, depths , aim -= steps ]
    return [ hor, depths, aim += steps ]
  }, [0, 0, 0])

  return hor * depths;
}
