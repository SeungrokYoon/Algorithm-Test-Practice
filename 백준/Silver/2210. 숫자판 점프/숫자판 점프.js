const map = require('fs')
  .readFileSync(process.platform == 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.split(' ').map(Number))

const TARGET = 6
const answer = new Set()
const pool = []
const dRow = [0, 1, 0, -1]
const dCol = [1, 0, -1, 0]

//방문한 수를 다시 방문해도 되니, 방문처리를 하지 않아도 된다
const dfs = (currRow, currCol, currStep, target) => {
  if (currStep === target) {
    const answerStr = pool.join('')
    if (!answer.has(answerStr)) answer.add(answerStr)
    return
  }
  for (let idx = 0; idx < 4; idx++) {
    const [nextRow, nextCol] = [currRow + dRow[idx], currCol + dCol[idx]]
    if (0 <= nextRow && 0 <= nextCol && nextRow < 5 && nextCol < 5) {
      pool.push(map[nextRow][nextCol])
      dfs(nextRow, nextCol, currStep + 1, target)
      pool.pop()
    }
  }
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    dfs(i, j, 0, TARGET)
  }
}

console.log(answer.size)
