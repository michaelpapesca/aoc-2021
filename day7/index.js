import {
  readInput,
  parseInput,
  findLinearEfficientUsage,
  findIncrementalEfficientUsage,
} from "./util.js";

const input = readInput();

const answerOne = partOne(input);
const answerTwo = partTwo(input);

console.log({ answerOne, answerTwo });

function partOne(input) {
  return findLinearEfficientUsage(parseInput(input));
}

function partTwo(input) {
  return findIncrementalEfficientUsage(parseInput(input));
}
