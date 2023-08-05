const intersectionInfo = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))
const [N, T] = intersectionInfo.shift()

const signalInfo = {
  1: ['up', 'right', 'down'],
  2: ['left', 'up', 'right'],
  3: ['up', 'left', 'down'],
  4: ['left', 'down', 'right'],
  5: ['up', 'right'],
  6: ['left', 'up'],
  7: ['left', 'down'],
  8: ['down', 'right'],
  9: ['right', 'down'],
  10: ['up', 'right'],
  11: ['up', 'left'],
  12: ['left', 'down'],
}
const availableSignals = { up: [2, 6, 10], right: [1, 5, 9], down: [4, 8, 12], left: [3, 7, 11] }
//[up, right, down, left]
const dirToDelta = { up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1] }

function validateCoorditate(x, y) {
  return x >= 0 && y >= 0 && x < N && y < N
}

const visitedMap = Array.from(Array(N), () => new Array(N).fill(0))

let answer = 0

function recursion({ currentRow, currentColumn }, currDir, currentT) {
  if (currentT > T) {
    return
  }
  if (visitedMap[currentRow][currentColumn] === 0) {
    visitedMap[currentRow][currentColumn] = 1
    answer++
  }
  const currentIntersectionIndex = currentRow * N + currentColumn
  const currentSignal = intersectionInfo[currentIntersectionIndex][currentT % 4]

  if (availableSignals[currDir].includes(currentSignal)) {
    const candidateDirections = signalInfo[currentSignal]
    for (const nextDir of candidateDirections) {
      const [rowDelta, columnDelta] = dirToDelta[nextDir]
      const nextRow = currentRow + rowDelta
      const nextColumn = currentColumn + columnDelta
      if (!validateCoorditate(nextRow, nextColumn)) continue
      recursion({ currentRow: nextRow, currentColumn: nextColumn }, nextDir, currentT + 1)
    }
  }
}

recursion({ currentRow: 0, currentColumn: 0 }, 'up', 0)

console.log(answer)
