//아기상어
const [[N], ...graph] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(Number))

let sharkX = 21
let sharkY = 21
let sharkSize = 2
let fishPrayed = 0
let minDist = 401
let minX = 21 // 상어가 먹을 물고기의 X 좌표 초기화
let minY = 21 // 상어가 먹을 물고기의 Y 좌표 초기화

const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => -1))

const bfs = (startX, startY) => {
  const dX = [1, 0, -1, 0] //위 왼쪽 하래 오른쪽
  const dY = [0, -1, 0, 1]
  const queue = []
  visited[startX][startY] = 0
  queue.push(startX)
  queue.push(startY)
  while (queue.length) {
    const x = queue.shift()
    const y = queue.shift()
    //먹을 수 있는 물고기
    for (let d = 0; d < 4; d++) {
      const newX = x + dX[d]
      const newY = y + dY[d]
      if (newX < 0 || newY < 0 || newX >= N || newY >= N) continue
      if (visited[newX][newY] !== -1 || graph[newX][newY] > sharkSize) continue
      //일단 이 이후로는 방문은 가능.
      visited[newX][newY] = visited[x][y] + 1
      //방문 가능한 것들 중, 먹을 수 있는 물고기들
      if (graph[newX][newY] !== 0 && graph[newX][newY] < sharkSize) {
        if (minDist > visited[newX][newY]) {
          minX = newX
          minY = newY
          minDist = visited[newX][newY]
        } else if (minDist === visited[newX][newY]) {
          if (minX === newX) {
            if (minY > newY) {
              minX = newX
              minY = newY
            }
          } else if (minX > newX) {
            minX = newX
            minY = newY
          }
        }
      }
      queue.push(newX)
      queue.push(newY)
    }
  }
}

const solution = () => {
  //상어 위치 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 9) {
        sharkX = i
        sharkY = j
        graph[i][j] = 0
      }
    }
  }
  let time = 0
  let isStop = false
  //초기 상어 위치에서 BFS시작
  while (!isStop) {
    bfs(sharkX, sharkY)
    if (minX !== sharkX && minY !== sharkY) {
      time += visited[minX][minY]

      fishPrayed++
      if (fishPrayed === sharkSize) {
        sharkSize++
        fishPrayed = 0
      }
      //물고기를 먹었으면 먹은 곳은 0으로 갱신
      graph[minX][minY] = 0
      //상어의 위치 갱신
      sharkX = minX
      sharkY = minY
    } else {
      break
    }
  }
  return time
}

console.log(solution())
