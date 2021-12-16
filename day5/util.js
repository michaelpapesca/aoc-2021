import lodash from "lodash";

const [START, END] = [0, 1];
const [X, Y] = [1, 0];

export function parseInput(input) {
  const lineStrings = input.split("\n");
  const lines = lineStrings.map((string) =>
    string.split("->").map((p) =>
      p
        ?.trim()
        .split(",")
        .map((num) => parseInt(num))
    )
  );
  return lines;
}

export function getHorizontalAndVerticalLines(lines) {
  return lines.filter((line) => !isDiagonal(line));
}

function isDiagonal(line) {
  return line[START][X] !== line[END][X] && line[START][Y] !== line[END][Y];
}

export function getXYLimits(lines) {
  let [maxX, maxY] = [0, 0];
  for (const line of lines) {
    maxX = Math.max(maxX, line[START][X], line[END][X]);
    maxY = Math.max(maxY, line[START][Y], line[END][Y]);
  }
  return [maxX, maxY];
}

export function mapVentLines(lines) {
  const [xSize, ySize] = getXYLimits(lines);
  const map = createEmptyMap(xSize + 1, ySize + 1);
  for (const line of lines) {
    addLineToMap(map, line);
  }

  return map;
}

function createEmptyMap(xSize, ySize) {
  const map = new Array(ySize);
  for (let y = 0; y < ySize; y++) {
    map[y] = new Array(xSize);
    for (let x = 0; x < xSize; x++) {
      map[y][x] = 0;
    }
  }
  return map;
}

function addLineToMap(map, line) {
  const [start, end] = line;
  const yMin = Math.min(start[Y], end[Y]);
  const yMax = Math.max(start[Y], end[Y]);
  const yLength = yMax - yMin;
  const xMin = Math.min(start[X], end[X]);
  const xMax = Math.max(start[X], end[X]);
  const xLength = xMax - xMin;
  const diagonal = isDiagonal(line);

  if (diagonal && xLength === yLength) {
    let xInc = 1;
    if (start[X] > end[X]) xInc = -1;
    let yInc = 1;
    if (start[Y] > end[Y]) yInc = -1;

    for (let i = 0; i <= xLength; i++) {
      map[start[Y] + i * yInc][start[X] + i * xInc] += 1;
    }
  } else if (!diagonal) {
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        map[y][x] += 1;
      }
    }
  }
}

export function getMapDangerPoints(map) {
  const points = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] > 1) {
        points.push([y, x]);
      }
    }
  }

  return points;
}

export function printMap(map) {
  for (let row of map) {
    console.log(row.join(" "));
  }
}
