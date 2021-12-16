import fs from "fs";
import {
  parseInput,
  getHorizontalAndVerticalLines,
  mapVentLines,
  getMapDangerPoints,
  printMap,
} from "./util.js";

const input = fs.readFileSync("day5/input.txt").toString();

const answerOne = partOne(input);
const answerTwo = partTwo(input);

console.log({ answerOne, answerTwo });

function partOne(input) {
  const lines = parseInput(input);

  const straightLines = getHorizontalAndVerticalLines(lines);

  const map = mapVentLines(straightLines);

  const dangerPoints = getMapDangerPoints(map);

  return dangerPoints.length;
}

function partTwo(input) {
  const lines = parseInput(input);

  const map = mapVentLines(lines);
  // printMap(map);

  const dangerPoints = getMapDangerPoints(map);

  return dangerPoints.length;
}
