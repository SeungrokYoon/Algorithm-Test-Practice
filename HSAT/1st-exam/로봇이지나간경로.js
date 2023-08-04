const input = require('fs').readFileSync(0).toString().trim().split('\n')
const [H, W] = input[0].split(' ').map(Number)

const originalMap = input.slice(1).map((l) => l.split(''))
const visited = Array.from({ length: H }, () => Array.from({ length: W }, () => 0))
console.log(visited)

const dRow = [-1, 0, 1, 0]
const dCol = [0, 1, 0, -1]

const answerArr = []

const dirToChar = { 0: '^', 1: '>', 2: 'v', 3: '<' }

const isWithinMatrix = (row, col) => {
  return row >= 0 && col >= 0 && row < H && col < W
}

const checkProceedable = ({ currRow, currCol, currDir, map, step }) => {
  const nextRowWithDist = currRow + dRow[currDir] * step
  const nextColWithDist = currCol + dCol[currDir] * step
  if (
    isWithinMatrix(nextRowWithDist, nextColWithDist) &&
    map[currRow][currCol] === '#' &&
    map[nextRowWithDist][nextColWithDist] === '#' &&
    visited[nextRowWithDist][nextColWithDist] === 0
  )
    return true
  return false
}

function findStartPoints(map) {
  const points = []
  for (let currRow = 0; currRow < H; currRow++) {
    for (let currCol = 0; currCol < W; currCol++) {
      let dirCounter = 0
      const obj = { row: null, col: null, dir: null }
      //4방향에 대해서 현재 좌표를 기준으로 탐색 진행.
      //하나의 길이 있는 곳이 시작점
      for (let currDir = 0; currDir < 4; currDir++) {
        const isProceedable = checkProceedable({ currRow, currCol, currDir, map, step: 1 })
        if (isProceedable) {
          obj.row = currRow
          obj.col = currCol
          obj.dir = currDir
          dirCounter++
        }
      }
      if (dirCounter === 1) points.push(obj)
    }
  }
  return points
}

const startPoints = findStartPoints(originalMap)

const solution = () => {
  const temp = []
  const queue = [startPoints[0]]
  while (queue.length) {
    const { row, col, dir } = queue.shift()
    visited[row][col] = 1
    for (let command of ['L', 'R', 'A']) {
      if (command === 'L') {
        const nextDir = (dir + 3) % 4
        const isProceedable = checkProceedable({ currRow, currCol, currDir: nextDir, map, step: 2 })
      } else if (command === 'R') {
        const nextDir = (dir + 1) % 4
      } else {
      }
    }
  }
}
