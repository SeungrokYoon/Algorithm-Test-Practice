//아기상어
const [[N], ...graph] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'test/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(' ').map(Number))

const solution = () => {
  //상어 위치 찾기
  const shark = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 9) shark.push([i, j])
    }
  }
  let time = 0
  let isStop = false
  let [startX, startY] = shark[0]
  let sharkSize = 2
  let fishPrayed = 0
  //상어 위치에서 BFS시작
  const findNextHop = (startX, startY) => {
    const dX = [1, 0, -1, 0] //위 왼쪽 하래 오른쪽
    const dY = [0, -1, 0, 1]
    let pointer = 0
    const queue = []
    queue.push(startX)
    queue.push(startY)
    queue.push(0)
    const counter = []
    while (pointer < queue.length) {
      const x = queue[pointer++]
      const y = queue[pointer++]
      const dist = queue[pointer++]
      //먹을 수 있는 물고기
      for (let d = 0; d < 4; d++) {
        const newX = x + dX[d]
        const newY = y + dY[d]
        if (newX < 0 || newY < 0 || newX >= N || newY >= N || graph[newX][newY] > sharkSize)
          continue
        if (graph[newX][newY] === 0) {
          //상어가 이동만 가능한 곳
          queue.push(newX)
          queue.push(newY)
          queue.push(dist + 1)
        } else if (graph[newX][newY] < sharkSize) {
          //상어가 먹을 수 있는 곳
          queue.push(newX)
          queue.push(newY)
          queue.push(dist + 1)
          counter.push([newX, newY, dist + 1])
        }
      }
      if (counter.length) {
        break
      }
    }
    return counter.length ? counter[0] : [-1, -1, -1]
  }

  while (!isStop) {
    const [nextX, nextY, nextDist] = findNextHop(startX, startY)
    if (nextX === -1) {
      isStop = true
      continue
    }
    //정상적으로 다음 상어의 위치가 나왔다?
    time += nextDist
    fishPrayed++
    if (fishPrayed === sharkSize) {
      sharkSize++
      fishPrayed = 0
    }
    graph[startX][startY] = 0
    graph[nextX][nextY] = sharkSize
    startX = nextX
    startY = nextY
  }

  return time
}
console.log(solution())
