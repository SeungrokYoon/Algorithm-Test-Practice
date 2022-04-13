const [[N, M], ...mapGraph] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(Number))
const dx = [0, -1, 0, 1]
const dy = [-1, 0, 1, 0]
let visitGraph = Array.from({ length: M }, () => Array.from({ length: N }, () => false))
const bfs = (row, col) => {
  let roomSize = 0
  const queue = []
  queue.push(row)
  queue.push(col)
  visitGraph[row][col] = true
  while (queue.length) {
    const x = queue.shift()
    const y = queue.shift()
    let wall = 1
    for (let i = 0; i < 4; i++) {
      if ((mapGraph[row][col] & wall) !== wall) {
        const nx = x + dx[i]
        const ny = y + dy[i]
        if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue
        if (visitGraph[nx][ny] === false) {
          roomSize++
          visitGraph[nx][ny] = true
          queue.push(nx)
          queue.push(ny)
        }
      }
      wall *= 2
    }
  }
  return roomSize
} //bfs

const solution = () => {
  let answer = ''
  let roomCount = 0
  let biggestRoomSize = 0
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (visitGraph[i][j] === false) {
        biggestRoomSize = Math.max(biggestRoomSize, bfs(i, j))
        roomCount++
      }
    }
  }
  answer += `${roomCount}\n`
  answer += `${biggestRoomSize}\n`

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      //매 칸마다 벽을 하나씩 부숴보면서 탐색
      for (let wall = 1; wall <= 8; wall *= 2) {
        if ((mapGraph[i][j] & wall) === wall) {
          //새로 방문하면서 탐색해야하니까 visitGraph 초기화
          visitGraph = Array.from({ length: M }, () => Array.from({ length: N }, () => false))
          mapGraph[i][j] -= wall
          biggestRoomSize = Math.max(biggestRoomSize, bfs(i, j))
          mapGraph[i][j] += wall
        }
      }
    }
  }
  answer += `${biggestRoomSize}\n`
  return answer.trim()
}

console.log(solution())
