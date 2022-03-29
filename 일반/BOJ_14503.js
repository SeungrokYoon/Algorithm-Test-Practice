const [[N, M], [r, c, d], ...graph] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

const directionMap = { 0: [-1, 0], 1: [0, 1], 2: [1, 0], 3: [0, -1] }

const cleanSpot = (row, col, direction) => {
  graph[row][col] = '-'
  answer++
  findNextSpot(row, col, direction)
}

const findNextSpot = (row, col, d) => {
  let leftDirection = (d + 3) % 4
  const [dRow, dCol] = directionMap[d]
  let loopCounter = 0
  while (loopCounter < 4) {
    let [dRowLeft, dColLeft] = directionMap[leftDirection]
    let [leftSpotRow, leftSpotCol] = [row + dRowLeft, col + dColLeft]
    if (isValid(leftSpotRow, leftSpotCol) && graph[leftSpotRow][leftSpotCol] === 0) {
      break
    } else {
      leftDirection = (leftDirection + 3) % 4
      loopCounter++
    }
  }
  if (loopCounter < 4) {
    let [dRowLeft, dColLeft] = directionMap[leftDirection]
    let [leftSpotRow, leftSpotCol] = [row + dRowLeft, col + dColLeft]
    cleanSpot(leftSpotRow, leftSpotCol, leftDirection)
  } else {
    const [backRow, backCol] = [row + dRow * -1, col + dCol * -1]
    if (graph[backRow][backCol] === 1) return
    findNextSpot(backRow, backCol, d)
  }
}

const isValid = (x, y) => {
  if (x >= 0 && x < N && y >= 0 && y < M) return true
  return false
}

let answer = 0
cleanSpot(r, c, d)
console.log(answer)
