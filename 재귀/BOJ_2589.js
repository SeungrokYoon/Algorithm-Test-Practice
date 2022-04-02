//BOJ_2589: 보물섬
const input = (
  process.platform === 'linux'
    ? require('fs').readFileSync('dev/stdin').toString().trim()
    : require('fs').readFileSync('test/test.txt').toString().trim()
).split('\n')

const [N, M] = input.shift().split(' ').map(Number)
const graph = input.map((s) => s.split(''))
//각 좌표에서 가장 먼 곳을 길이로 저장. 매 번 시간을 지도에 저장한다.
const dRow = [0, 0, -1, 1]
const dCol = [1, -1, 0, 0]
let farthestShortestPath = 0

const solution = () => {
  for (let startRow = 0; startRow < N; startRow++) {
    for (let startCol = 0; startCol < M; startCol++) {
      //탐색
      const deepCopiedGraph = deepCopy(graph)
      if (deepCopiedGraph[startRow][startCol] === 'W') continue
      const queue = []
      queue.push(startRow)
      queue.push(startCol)
      queue.push(0)
      deepCopiedGraph[startRow][startCol] = 0
      let pointer = 0
      while (pointer < queue.length) {
        const x = queue[pointer++]
        const y = queue[pointer++]
        const dist = queue[pointer++]
        farthestShortestPath = Math.max(farthestShortestPath, dist)
        for (let d = 0; d < 4; d++) {
          const nextRow = x + dRow[d]
          const nextCol = y + dCol[d]
          if (
            nextRow < 0 ||
            nextRow >= N ||
            nextCol < 0 ||
            nextCol >= M ||
            deepCopiedGraph[nextRow][nextCol] !== 'L'
          )
            continue
          deepCopiedGraph[nextRow][nextCol] = dist + 1
          queue.push(nextRow)
          queue.push(nextCol)
          queue.push(dist + 1)
        }
      }
    }
  }
}

const deepCopy = (graph) => {
  const tempGraph = []
  graph.forEach((row) => {
    tempGraph.push([...row])
  })
  return tempGraph
}
solution()
console.log(farthestShortestPath)
