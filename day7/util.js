import fs from "fs";
import lodash from "lodash";

export function readInput() {
  return fs.readFileSync("day7/input.txt").toString();
}

export function parseInput(input) {
  return input.split(",").map((v) => parseInt(v.trim()));
}

export function findLinearEfficientUsage(positions) {
  const usages = getLinearFuelUsages(positions);
  const totals = getUsageTotals(usages);
  const [minKey, minTotal] = getMinKeyAndTotal(totals);
  return minTotal;
}

export function findIncrementalEfficientUsage(positions) {
  const usages = getIncrementalFuelUsages(positions);
  const totals = getUsageTotals(usages);
  const [minKey, minTotal] = getMinKeyAndTotal(totals);
  return minTotal;
}

function getLinearFuelUsages(positions) {
  let usages = {};
  const uniquePositions = new Set(positions);

  uniquePositions.forEach((u) => {
    usages[u] = positions.map((p) => Math.abs(p - u));
  });

  return usages;
}

function getIncrementalFuelUsages(positions) {
  let usages = {};
  const uniquePositions = new Set(positions);
  uniquePositions.forEach((u) => {
    usages[u] = positions.map((p) => {
      const moves = Math.abs(p - u);
      const fuelUsage = (moves * (moves + 1)) / 2;
      return fuelUsage;
    });
  });

  return usages;
}

function getUsageTotals(usages) {
  return Object.fromEntries(
    Object.entries(usages).map(([position, fuelUsages]) => [
      position,
      lodash.sum(fuelUsages),
    ])
  );
}

function getMinKeyAndTotal(totals) {
  const values = Object.values(totals);
  const keys = Object.keys(totals);
  const minValue = getMin(values);
  const minIndex = values.indexOf(minValue);
  const minKey = keys[minIndex];
  console.log({ minValue, minIndex, minKey });
  return [minKey, minValue];
}

function getMin(values) {
  const sortedValues = JSON.parse(JSON.stringify(values));
  sortedValues.sort((a, b) => a - b);
  return sortedValues[0];
}
