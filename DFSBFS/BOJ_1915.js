const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const graph = input.map((s) => s.split('').map(Number))
let answer = 1
const copyGraph = (graph) => {
  const copied = []
  graph.forEach((row) => copied.push([...row]))
  return copied
}
const findSquare = (row, col, graph) => {
  let tempAnswer = 1
  //오른쪽, 아래, 아래대각선으로만 탐색
  let pointer = 0
  const dRow = [0, 1, 1]
  const dCol = [1, 0, 1]
  const copied = graph
  const queue = []
  queue.push(row)
  queue.push(col)
  while (pointer < queue.length) {
    const currentRow = queue[pointer++]
    const currentCol = queue[pointer++]
    for (let i = 0; i < 3; i++) {
      const nextRow = currentRow + dRow[i]
      const nextCol = currentCol + dCol[i]
      if (
        0 > nextRow ||
        N <= nextRow ||
        0 > nextCol ||
        M <= nextCol ||
        copied[nextRow][nextCol] === 0
      )
        break
      if (
        0 > nextRow ||
        N <= nextRow ||
        0 > nextCol ||
        M <= nextCol ||
        copied[nextRow][nextCol] === 2
      )
        continue
      if (nextRow - row === nextCol - col) tempAnswer++
      copied[nextRow][nextCol] = 2
      queue.push(nextRow)
      queue.push(nextCol)
    }
  }
  answer = Math.max(tempAnswer, answer)
}

const solution = () => {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (graph[row][col] !== 1) continue
      findSquare(row, col, graph)
    }
  }
}

solution()
console.log(answer * answer)
