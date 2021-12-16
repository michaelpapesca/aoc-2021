import fs from "fs";
import lodash from "lodash";

export function readInput() {
  return fs.readFileSync("dayTemplate/input.txt").toString();
}

export function parseInput(input) {
  return input.split(",").map((v) => parseInt(v.trim()));
}
