const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')

const N = input.shift()
const solution = (i) => {
  let answer = 0
  const size = input.shift() * 1
  const [fromRow, fromCol] = input.shift().split(' ').map(Number)
  const [toRow, toCol] = input.shift().split(' ').map(Number)
  const graph = Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
  const queue = []
  queue.push(fromRow)
  queue.push(fromCol)
  queue.push(0)
  graph[fromRow][fromCol] = 1
  while (queue.length) {
    const fromRow = queue.shift()
    const fromCol = queue.shift()
    const dist = queue.shift()
    const dRow = [1, 1, 2, 2, -1, -1, -2, -2]
    const dCol = [2, -2, 1, -1, 2, -2, 1, -1]
    for (let i = 0; i < 8; i++) {
      const nextRow = fromRow + dRow[i]
      const nextCol = fromCol + dCol[i]
      if (
        nextRow < 0 ||
        nextRow >= size ||
        nextCol < 0 ||
        nextCol >= size ||
        graph[nextRow][nextCol] === 1
      )
        continue
      if (nextRow === toRow && nextCol === toCol) {
        answer = dist + 1
        return answer
      }
      graph[nextRow][nextCol] = 1
      queue.push(nextRow)
      queue.push(nextCol)
      queue.push(dist + 1)
    }
  }
  return answer
}
for (let i = 0; i < N; i++) {
  console.log(solution(i))
}
