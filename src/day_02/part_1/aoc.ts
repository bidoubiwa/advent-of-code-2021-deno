type instruction = [string, number]
type instructions = instruction[]

function parseInput(input: string): instructions {
  return input.split("\n").filter(str => str.length > 0).map(raw => {
    let [dir, dis] = raw.split(" ")
    return [dir[0], parseInt(dis)]
  })
}

export function main(input: string): number {
  const instructions = parseInput(input)
  
  const [ hor, depths ] = instructions.reduce(([hor, depths], [instruction, steps]) => {
    if (instruction === 'f') return [ hor += steps, depths ]
    else if (instruction === 'u') return [ hor, depths -= steps ]
    return [ hor, depths += steps ]
  }, [0,0])

  
  return hor * depths;
}
