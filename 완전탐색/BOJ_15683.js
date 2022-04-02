let [[N, M], ...graph] = require('fs')
  .readFileSync('test.txt')
  .toString()
  .trim()
  .split('\n')
  .map((s) => s.split(' ').map(Number))

let answer = 0

const solution = (N, M, graph) => {
  const cameras = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0) answer++
      if (graph[i][j] !== 0 && graph[i][j] !== 6) cameras.push([i, j, graph[i][j]])
    }
  }
  recursion(0, cameras, graph)
}

const recursion = (depth, cameras, graph) => {
  if (depth === cameras.length) {
    //recursion ends
    let tempAnswer = 0
    graph.forEach((row, i) => {
      row.forEach((_, j) => {
        tempAnswer += graph[i][j] === 0 ? 1 : 0
      })
    })
    answer = Math.min(answer, tempAnswer)
    return
  }
  const [cRow, cCol, cameraNum] = cameras[depth]
  const originalGraph = deepCopyGraph(graph)
  switch (cameraNum) {
    case 1:
      //4군데를 recursion
      fillGraph(cRow, cCol, graph, 1)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 2)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 3)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 4)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      break
    case 2:
      //2각도 recursion
      fillGraph(cRow, cCol, graph, 1, 3)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 2, 4)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      break
    case 3:
      //4각도 recursion
      fillGraph(cRow, cCol, graph, 1, 2)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 2, 3)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 3, 4)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 4, 1)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      break
    case 4:
      //4각도 recurse
      fillGraph(cRow, cCol, graph, 1, 2, 3)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 2, 3, 4)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 3, 4, 1)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      fillGraph(cRow, cCol, graph, 4, 1, 2)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
      break
    default:
      //5인 경우
      fillGraph(cRow, cCol, graph, 1, 2, 3, 4)
      recursion(depth + 1, cameras, graph)
      graph = deepCopyGraph(originalGraph)
  }
}

const fillGraph = (cRow, cCol, graph, ...directions) => {
  const angles = { 1: [-1, 0], 2: [0, 1], 3: [1, 0], 4: [0, -1] }
  for (const direction of directions) {
    let row = cRow
    let col = cCol
    const [dx, dy] = angles[direction]
    let isStop = false
    while (!isStop) {
      let nextRow = row + dx
      let nextCol = col + dy
      if (nextRow >= 0 && nextRow < N && nextCol >= 0 && nextCol < M) {
        if (graph[nextRow][nextCol] === 6) {
          isStop = true
          break
        }
        if (graph[nextRow][nextCol] === 0) {
          graph[nextRow][nextCol] = '#'
        }
        row = nextRow
        col = nextCol
        continue
      }
      isStop = true
    }
  }
}

const deepCopyGraph = (graph) => {
  const newGraph = []
  graph.forEach((row) => {
    newGraph.push([...row])
  })
  return newGraph
}

solution(N, M, graph)
console.log(answer)
