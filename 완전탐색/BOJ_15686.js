// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')
const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map((i) => +i))
const [n, m] = input.shift()
const graph = input

const getChickenDistance = (n, combi, home, graph) => {
  let totalDistance = 0
  const newGraph = makeNewGraph(n, combi, graph)
  home.forEach((location) => {
    const [x, y] = location
    totalDistance += bfs(n, x, y, newGraph)
  })
  return totalDistance
}

const makeEmptyGraph = (n) => {
  const newGraph = []
  for (let j = 0; j < n; j++) {
    const temp = []
    for (let i = 0; i < n; i++) {
      temp.push(0)
    }
    newGraph.push(temp)
  }
  return newGraph
}

const makeNewGraph = (n, combi, graph) => {
  const newGraph = makeEmptyGraph(n)
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (graph[y][x] === 1) newGraph[y][x] = 1
    }
  }
  combi.forEach((closedChicken) => (newGraph[closedChicken[2]][closedChicken[1]] = 2))
  return newGraph
}

const bfs = (n, startX, startY, graph) => {
  const queue = []
  const visitedGraph = makeEmptyGraph(n)
  const dy = [0, 1, 0, -1]
  const dx = [1, 0, -1, 0]
  queue.push([startX, startY])
  visitedGraph[startY][startX] = 1
  while (queue.length) {
    const [x, y] = queue.shift()
    for (let i = 0; i < 4; i++) {
      const newX = x + dx[i]
      const newY = y + dy[i]
      if (
        matrixValidator(n, newX, newY) &&
        visitedGraph[newY][newX] === 0 &&
        graph[newY][newX] === 2
      ) {
        //가장 가까운 치킨집을 찾음
        return Math.abs(newX - startX) + Math.abs(newY - startY)
      } else if (matrixValidator(n, newX, newY)) {
        queue.push([newX, newY])
      }
    }
  }
}

const matrixValidator = (n, x, y) => {
  if (x >= 0 && y >= 0 && x < n && y < n) return true
  return false
}

const solution = (n, m, graph) => {
  let queuePointer = 0
  let minDistance = []
  //치킨집과 일반집의 좌표를 기록한다.
  const bbq = []
  const queue = []
  const home = []
  let id = 0
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (graph[y][x] === 2) {
        bbq.push([id, x, y])
        queue.push([[id, x, y]])
        id++
      } else if (graph[y][x] === 1) home.push([x, y])
    }
  }

  //1~ M개만큼 치킨집 살려야 함
  //살리는 조합 찾기
  while (queuePointer < queue.length) {
    const dequeued = []
    for (let closed of queue[queuePointer]) {
      dequeued.push([...closed])
    }
    for (let nextChicken of bbq) {
      const lastChickenId = dequeued[dequeued.length - 1][0]
      const nextChickenId = nextChicken[0]
      if (lastChickenId < nextChickenId && dequeued.length < m) {
        const enqueued = [...dequeued, [...nextChicken]]
        queue.push(enqueued)
      }
    }
    queuePointer += 1
  }

  for (let combi of queue) {
    //고른 조합의 좌표값의 치킨집만 살려서, 총 치킨거리를 구한다
    const distance = getChickenDistance(n, combi, home, graph)
    minDistance.push(distance)
  }
  return Math.min(...minDistance)
}

console.log(solution(n, m, graph))
