const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const OBSTACLE = 2
const VISITED = 1
const EMPTY = 0

const [N, M, A, B, K] = input[0].split(' ').map(Number)
const obstacles = input.slice(1, 1 + K).map((l) => l.split(' ').map(Number))
const [startRow, startCol] = input[1 + K].split(' ').map(Number)
const [endRow, endCol] = input[2 + K].split(' ').map(Number)
const map = Array.from({ length: N + 1 }, () => Array.from({ length: M + 1 }, () => EMPTY))
//초기 방문 설정
obstacles.forEach(([r, c]) => {
  map[r][c] = OBSTACLE
})

for (let rowDelta = 0; rowDelta < A; rowDelta++) {
  for (let colDelta = 0; colDelta < B; colDelta++) {
    map[startRow + rowDelta][startCol + colDelta] = VISITED
  }
}

const queue = [[startRow, startCol, 0]]
//우하좌상
const dRow = [0, 1, 0, -1]
const dCol = [1, 0, -1, 0]

function isMovable(row, col, A, B, delta) {
  const FALSE = [false, 0, 0]
  const TRUE = [true, row, col]
  if (delta === 0) {
    //우
    const rightColIdx = col + B - 1
    if (rightColIdx > M) return FALSE
    let visited = 0
    for (let r = row; r < row + A; r++) {
      const righterMostCell = map[r][rightColIdx]
      if (righterMostCell === OBSTACLE) return FALSE
      if (righterMostCell === VISITED) {
        visited++
      }
    }
    if (visited === A) return FALSE
    return TRUE
  } else if (delta === 1) {
    //하
    const bottomRowIdx = row + A - 1
    if (bottomRowIdx > N) return FALSE
    let visited = 0
    for (let c = col; c < col + B; c++) {
      const bottomCell = map[bottomRowIdx][c]
      if (bottomCell === OBSTACLE) return FALSE
      if (bottomCell === VISITED) {
        visited++
      }
    }
    if (visited === B) return FALSE
    return TRUE
  } else if (delta === 2) {
    //좌
    if (col < 1) return FALSE
    let visited = 0
    for (let r = row; r < row + A; r++) {
      const leftMostCell = map[r][col]
      if (leftMostCell === OBSTACLE) return FALSE
      if (leftMostCell === VISITED) {
        visited++
      }
    }
    if (visited === A) return FALSE
    return TRUE
  } else {
    //상
    if (row < 1) return FALSE
    let visited = 0
    for (let c = col; c < col + B; c++) {
      const ceilCell = map[row][c]
      if (ceilCell === OBSTACLE) return FALSE
      if (ceilCell === VISITED) {
        visited++
      }
    }
    if (visited === B) return FALSE
    return TRUE
  }
}

let answer = -1
while (queue.length) {
  const [sRow, sCol, dist] = queue.shift()
  if (sRow === endRow && sCol === endCol) {
    answer = dist
    break
  }
  for (let i = 0; i < 4; i++) {
    const [isPossible, newRow, newCol] = isMovable(sRow + dRow[i], sCol + dCol[i], A, B, i)
    if (!isPossible) continue
    for (let rowDelta = 0; rowDelta < A; rowDelta++) {
      for (let colDelta = 0; colDelta < B; colDelta++) {
        map[newRow + rowDelta][newCol + colDelta] = VISITED
      }
    }
    queue.push([newRow, newCol, dist + 1])
  }
}

console.log(answer)
