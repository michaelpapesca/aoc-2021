import fs from "fs";
import lodash from "lodash";

export function readInput() {
  return fs.readFileSync("day6/input.txt").toString();
}

export function parseInput(input) {
  return input.split(",").map((v) => parseInt(v.trim()));
}

export function waitDaysCount(days, fish) {
  for (let i = 0; i < days; i++) {
    countDown(fish);
  }
  return fish.length;
}

export function smartWaitDaysCount(days, fish) {
  let counts = countFish(fish);
  for (let i = 0; i < days; i++) {
    smartCountDown(counts);
  }

  return lodash.sum(counts);
}

export function countDown(fish) {
  const newFish = [];
  for (let i = 0; i < fish.length; i++) {
    if (fish[i] <= 0) {
      addNewFish(newFish);
      fish[i] = 6;
    } else {
      fish[i]--;
    }
  }
  fish.push(...newFish);
}

export function countFish(fish) {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fish.forEach((f) => counts[f]++);

  return counts;
}

export function smartCountDown(counts) {
  const oldCounts = copyCount(counts);
  const reproLength = 6;
  for (let i = 0; i < counts.length; i++) {
    if (i === reproLength) {
      counts[i] = oldCounts[i + 1] + oldCounts[0];
    } else if (i === counts.length - 1) {
      counts[i] = oldCounts[0];
    } else {
      counts[i] = oldCounts[i + 1];
    }
  }
}

export function addNewFish(fish) {
  fish.push(8);
}

export function printCounts(fish) {
  counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fish.forEach((f) => counts[f]++);
}

function copyCount(count) {
  return JSON.parse(JSON.stringify(count));
}
