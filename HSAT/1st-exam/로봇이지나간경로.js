const input = require('fs').readFileSync(0).toString().trim().split('\n')
const [H, W] = input[0].split(' ').map(Number)
const originalMap = input.slice(1).map((l) => l.split(''))
const answerArr = []

const dirToChar = { 0: '^', 1: '>', 2: 'v', 3: '<' }
const dirToDelta = { 0: [-2, 0], 1: [0, 2], 2: [2, 0], 3: [0, -2] }
const commands = ['L', 'R', 'A']

const validateCoord = (row, col) => {
  return row >= 0 && col >= 0 && row < H && col < W
}

const checkIsSame = (originalMap, visited) => {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      const filled = originalMap[i][j] == '#' && visited[i][j] == 1
      const empty = originalMap[i][j] == '.' && visited[i][j] == 0
      if (filled || empty) continue
      return false
    }
  }
  return true
}

const temp = []
const pool = []
const recursion = (currRow, currCol, currDir, visited, dirVisited) => {
  if (checkIsSame(originalMap, visited)) {
    temp.push(pool.join(''))
    return
  }
  for (const command of commands) {
    if (command === 'L') {
      pool.push('L')
      const nextDir = (currDir + 3) % 4
      if (dirVisited[nextDir]) continue
      dirVisited[nextDir] = 1
      recursion(currRow, currCol, nextDir, visited, dirVisited)
      pool.pop()
    } else if (command === 'R') {
      pool.push('R')
      const nextDir = (currDir + 1) % 4
      if (dirVisited[nextDir]) continue
      dirVisited[nextDir] = 1
      recursion(currRow, currCol, nextDir, visited, dirVisited)
      pool.pop()
    } else {
      //'A'
      const [rowDelta, columnDelta] = dirToDelta[currDir]
      const nextRow = currRow + rowDelta
      const nextColumn = currCol + columnDelta
      if (!validateCoord(nextRow, nextColumn)) continue
      if (originalMap[nextRow][nextColumn] !== '#') continue
      if (visited[nextRow][nextColumn]) continue
      //방문표시
      for (let i = 0; i < rowDelta; i++) {
        if (visited[currRow + i][currCol] !== originalMap[currRow + i][currCol]) return
        visited[currRow + i][currCol] = 1
      }
      for (let i = 0; i < columnDelta; i++) {
        if (visited[currRow][currCol + i] !== originalMap[currRow][currCol + i]) return
        visited[currRow][currCol + i] = 1
      }
      pool.push('A')
      const nextDirVisited = [0, 0, 0, 0]
      nextDirVisited[currDir] = 1
      recursion(nextRow, nextColumn, currDir, visited, nextDirVisited)
      pool.pop()
      for (let i = 0; i < rowDelta; i++) {
        visited[currRow + i][currCol] = 0
      }
      for (let i = 0; i < columnDelta; i++) {
        visited[currRow][currCol + i] = 0
      }
    }
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    for (let dir = 0; dir < 4; dir++) {
      const visited = Array.from(Array(H), () => new Array(W).fill(0))
      const dirVisited = [0, 0, 0, 0]
      dirVisited[dir] = 1
      recursion(i, j, dir, visited, dirVisited)
    }
  }
}

console.log(answerArr)
