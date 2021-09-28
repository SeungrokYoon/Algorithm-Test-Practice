// 백준 - 14502 : 연구소
// 링크 : https://www.acmicpc.net/problem/14502

const readline = require('readline')

const input = []
const graph = []
let N = 0
let M = 0
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  input.push(line)
}).on('close', function () {
  const first = input
    .shift()
    .split(' ')
    .map((el) => Number(el))
  N = first[0]
  M = first[1]
  for (let i = 0; i < N; i++) {
    graph.push(input[i].split(' ').map((el) => Number(el)))
  }

  solution(graph)
  process.exit()
})

const solution = () => {
  // 벽을 세우는 게 문제.좌표 세개를 골라서 subSolution 하기
  const result = []

  for (let first = 0; first < N * M - 2; first++) {
    for (let second = first + 1; second < N * M - 1; second++) {
      for (let third = second + 1; third < N * M; third++) {
        // 깊은 복사를 통해 오리지널 graph와는 다른 조작 대상의 별개의 그래프를 만들어준다.
        const tempGraph = JSON.parse(JSON.stringify(graph))

        const combi = [first, second, third].map((el) => [
          parseInt(el / M),
          el % M,
        ])
        // 유효한 벽범위 검증
        const x1 = combi[0][0]
        const y1 = combi[0][1]
        const x2 = combi[1][0]
        const y2 = combi[1][1]
        const x3 = combi[2][0]
        const y3 = combi[2][1]

        if (
          tempGraph[x1][y1] === 0 &&
          tempGraph[x2][y2] === 0 &&
          tempGraph[x3][y3] === 0
        ) {
          tempGraph[x1][y1] = 1
          tempGraph[x2][y2] = 1
          tempGraph[x3][y3] = 1
          result.push(subSolution(tempGraph))
        }
      }
    }
  }
  console.log(Math.max(...result))
  return result
}

const validateLocation = (x, y) => {
  if (x >= 0 && x < N && y >= 0 && y < M) {
    return true
  }
  return false
}

const subSolution = (tempGraph) => {
  const subGraph = tempGraph
  let totalContaminated = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const currentValue = subGraph[i][j]
      if (currentValue === 1) {
        totalContaminated++
      }
      if (currentValue === 2) {
        totalContaminated += dfs(i, j, subGraph)
      }
    }
  }
  const safeZones = N * M - totalContaminated
  return safeZones
}

const dfs = (x, y, graph) => {
  let contaminated = 0
  const dx = [0, 1, -1, 0]
  const dy = [1, 0, 0, -1]
  const stack = []
  stack.push([x, y])
  graph[x][y] = 3
  contaminated++
  while (stack.length) {
    const [x, y] = stack.pop()
    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i]
      const nextY = y + dy[i]
      if (!validateLocation(nextX, nextY)) {
        continue
      }
      if (graph[nextX][nextY] === 1) {
        continue
      }
      if (graph[nextX][nextY] === 0 || graph[nextX][nextY] === 2) {
        graph[nextX][nextY] = 3 // 전염 방문처리
        stack.push([nextX, nextY])
        contaminated++
      }
    }
  }
  return contaminated
}
