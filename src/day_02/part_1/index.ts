import { inputFileResolver } from '../../../utils/index.ts';;
import { main } from './aoc.ts';

// Get absolute path to the input file of the current directory
const pathToFile = inputFileResolver('inputfile');

const inputContent = await Deno.readTextFile(pathToFile);
const solution = main(inputContent);

console.log(`Solution:`, solution);
