const intersectionInfo = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number))
const [N, T] = intersectionInfo.shift()

function rotateDirectionReverseClockWise(currentArr, rotate) {
  const newArr = currentArr.map(([i, j]) => {
    for (let r = 0; r < rotate; r++) {
      let tempI = i
      i = j
      j = parseInt(-tempI)
    }
    return [i, j]
  })
  return newArr
}

function genSignalMap(originDelta) {
  const dirObj = {}
  for (let i = 0; i < 12; i++) {
    const quote = parseInt(i / 4)
    const remainder = i % 4
    const index = i + 1
    let rowDelta = null
    if (quote === 0) {
      rowDelta = originDelta
    } else if (quote === 1) {
      rowDelta = originDelta.slice(0, 2)
    } else {
      rowDelta = originDelta.slice(1)
    }
    dirObj[index] = rotateDirectionReverseClockWise(rowDelta, remainder)
  }
  return dirObj
}

function validateCoorditate(x, y) {
  return x >= 0 && y >= 0 && x < N && y < N
}

const deltaMap = genSignalMap([
  [0, -1],
  [1, 0],
  [0, 1],
])

const visitedMap = Array.from(Array(N), () => new Array(N).fill(0))

function recursion({ currentRow, currentColumn }, currentT) {
  if (currentT > T) {
    return
  }
  if (visitedMap[currentRow][currentColumn] === 0) visitedMap[currentRow][currentColumn] = 1
  const currentSignalArr = intersectionInfo[currentRow * N + currentColumn]
  const signalIndex = currentT % 4
  const currentSignalNumberByTime = currentSignalArr[signalIndex]
  const directionsArr = deltaMap[currentSignalNumberByTime.toString()]

  for (const [deltaColumn, deltaRow] of directionsArr) {
    const nextRow = currentRow + deltaRow
    const nextColumn = currentColumn + deltaColumn
    //recursion by dfs
    if (validateCoorditate(nextRow, nextColumn)) {
      //update map
      recursion({ currentRow: nextRow, currentColumn: nextColumn }, currentT + 1)
    }
  }
}

function solution() {
  let answer = 0
  recursion({ currentRow: 0, currentColumn: 0 }, 0)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visitedMap[i][j]) answer++
    }
  }
  return answer
}

console.log(solution())
