import {
  readInput,
  parseInput,
  waitDaysCount,
  smartWaitDaysCount,
} from "./util.js";

const input = readInput();

const answerOne = partOne(input);
const answerTwo = partTwo(input);

console.log({ answerOne, answerTwo });

function partOne(input) {
  const total = waitDaysCount(80, parseInput(input));
  return total;
}

function partTwo(input) {
  return smartWaitDaysCount(256, parseInput(input));
}
