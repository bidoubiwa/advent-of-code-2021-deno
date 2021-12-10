<h1 align="center"> Advent of code 2021 with Deno </h1>

<p align="center">
  <img src="./assets/advent.jpeg" width="400" height="auto" />
</p>

<p align="center">
  <img src="./assets/logo.svg" width="100" height="auto" />
</p>

### Requirements 

I only guarantee the scripts working with the following configuration

```
deno 1.16.4
v8 9.7.106.15
typescript 4.4.2
```

### Usage

```bash
deno run --watch --A <path to index.ts>
```

### Generate new day

The scripts automatically creates a new `day_x` folder based on the last day number already existing.
It adds two directories `part_1` and `part_2` and copies the `README.md` from the [repo of irevoire](git@github.com:irevoire/aoc2021.git).
Let's hope he ran his script before you launch this script. 

```bash
deno run --unstable -A scripts/init_day/index.ts
```

### Day 1

- **Part 1** [code](src/day_01/part_1/aoc.ts)

- **Part 2** [code](./src/day_01/part_2/aoc.ts)


### Day 2

- **Part 1** [code](./src/day_02/part_1/aoc.ts)

- **Part 2** [code](./src/day_02/part_2/aoc.ts)


### Day 3

- **Part 1** [code](./src/day_03/part_1/aoc.ts)

- **Part 2** [code](./src/day_03/part_2/aoc.ts)

### Day 4

- **Part 1** [code](./src/day_04/part_1/aoc.ts)

- **Part 2** [code](./src/day_04/part_2/aoc.ts)

### Day 5

- **Part 1** [code](./src/day_05/part_1/aoc.ts)

- **Part 2** [code](./src/day_05/part_2/aoc.ts)

### Day 6

- **Part 1** [code](./src/day_06/part_1/aoc.ts)

- **Part 2** [code](./src/day_06/part_2/aoc.ts)

### Day 7

- **Part 1** [code](./src/day_07/part_1/aoc.ts)

- **Part 2** [code](./src/day_07/part_2/aoc.ts)

### Day 8

- **Part 1** [code](./src/day_08/part_1/aoc.ts)

- **Part 2** [code](./src/day_08/part_2/aoc.ts)

### Day 9

- **Part 1** [code](./src/day_09/part_1/aoc.ts)

- **Part 2** [code](./src/day_09/part_2/aoc.ts)
