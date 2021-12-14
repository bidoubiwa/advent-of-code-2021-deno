import { fileResolver } from '../../../utils/index.ts';
import { main } from './aoc.ts';

// Get absolute path to the input file of the current directory
const pathToFile = fileResolver('../inputfile');

const inputContent = await Deno.readTextFile(pathToFile);
const solution = main(inputContent);

console.log(`Solution:`, solution);
